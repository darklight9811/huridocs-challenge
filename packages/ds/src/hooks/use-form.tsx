import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { LoaderIcon } from "lucide-react";
import { type ComponentProps, useState } from "react";

import { cn } from "../lib/utils";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

export const { fieldContext, formContext, useFormContext, useFieldContext } = createFormHookContexts();

export function Submit({
	children,
	whenDirty,
	...props
}: Omit<ComponentProps<typeof Button>, "type"> & { whenDirty?: boolean }) {
	const form = useFormContext();

	return (
		<form.Subscribe
			selector={(state) => ({
				isSubmitting: state.isSubmitting,
				isDirty: state.isDirty,
			})}
		>
			{({ isSubmitting, isDirty }) => (
				<Button
					{...props}
					variant={props.variant || "primary"}
					type="submit"
					disabled={isSubmitting || (whenDirty === true && !isDirty) || props.disabled}
				>
					{isSubmitting && <LoaderIcon className="animate-spin" />}
					{children}
				</Button>
			)}
		</form.Subscribe>
	);
}

export const { useAppForm } = createFormHook({
	fieldComponents: {},
	formComponents: {
		Form({
			children,
			form,
			...props
		}: React.ComponentProps<"form"> & {
			form: {
				handleSubmit(): void;
				AppForm: React.ComponentType<{ children?: React.ReactNode }>;
			};
		}) {
			return (
				<form.AppForm>
					<form
						{...props}
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
					>
						{children}
					</form>
				</form.AppForm>
			);
		},
		Submit,
		Fieldset(props: {
			children: React.ReactNode;
			label?: React.ReactNode;
			errorless?: boolean;
			className?: string;
		}) {
			const field = useFieldContext();

			return (
				<fieldset className={cn("flex flex-col", props.className)}>
					{props.label && (
						<label className="pb-2" htmlFor={field.name}>
							{props.label}
						</label>
					)}
					{props.children}
					{props.errorless !== true && (
						<p className="mt-2 text-sm font-medium text-destructive h-5" role="alert">
							{field.state.meta.errors[0]?.message}
						</p>
					)}
				</fieldset>
			);
		},
		InlineFieldset(props: { children: React.ReactNode; label?: string; className?: string }) {
			const field = useFieldContext();

			return (
				<fieldset className={cn("flex flex-row-reverse justify-end items-center gap-2", props.className)}>
					{props.label && (
						<label className="pb-2" htmlFor={field.name}>
							{props.label}
						</label>
					)}
					{props.children}
				</fieldset>
			);
		},
		NullableFieldset(props: {
			children: React.ReactNode;
			label?: React.ReactNode;
			toggleLabel?: React.ReactNode;
			errorless?: boolean;
			className?: string;
		}) {
			const field = useFieldContext();
			const [isNullable, setIsNullable] = useState(field.state.value == null);

			return (
				<fieldset className={cn("flex flex-col", props.className)}>
					{props.label && (
						<label className="pb-2" htmlFor={field.name}>
							{props.label}
						</label>
					)}
					<div className="flex gap-2 items-center">
						<Checkbox
							checked={!isNullable}
							onCheckedChange={() => {
								setIsNullable(!isNullable);
								if (!isNullable && field.state.value !== null) field.handleChange(null);
							}}
						/>

						{props.toggleLabel}

						<div style={{ flex: 1 }} className={isNullable ? "opacity-10 pointer-events-none" : ""}>
							{props.children}
						</div>
					</div>
					{props.errorless !== true && (
						<p className="mt-2 text-sm font-medium text-destructive h-5" role="alert">
							{field.state.meta.errors.map((t) => t.message).join(", ")}
						</p>
					)}
				</fieldset>
			);
		},
	},
	fieldContext,
	formContext,
});
