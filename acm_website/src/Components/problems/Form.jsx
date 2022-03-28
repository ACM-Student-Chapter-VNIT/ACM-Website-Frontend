import React from "react";

// to get all the forms from localStorage
const getLocalForms = () => {
	const localForms = localStorage.getItem("formData");
	return localForms ? JSON.parse(localForms) : [];
};

// save the form in localStorage
const saveLocalForms = (forms) => {
	localStorage.setItem("formData", JSON.stringify(forms));
};

const initialState = (id) => {
	const formData = getLocalForms();
	const newForm = {
		id: id,
		title: "",
		formFields: [],
	};
	saveLocalForms([...formData, newForm]);
	return newForm;
};

// save the form on each input
const handleSave = (field) => {
	const formData = getLocalForms();
	const updateFormData = formData.map((f) => {
		if (f.id === field.id) {
			return field;
		}
		return f;
	});
	saveLocalForms(updateFormData);
};

const Form = (props) => {
	const [form, setForm] = React.useState(() => initialState(props.formId));
	const [fieldInput, setFieldInput] = React.useState("");

	// remove form field
	const RemoveField = (field_id) => {
		setForm({
			...form,
			formFields: form.formFields.filter((f) => f.id !== field_id),
		});
	};

	// add form field
	const AddField = () => {
		setForm({
			...form,
			formFields: [
				...form.formFields,
				{
					id: new Date().getTime().toString(),
					label: fieldInput,
					value: "",
				},
			],
		});
		setFieldInput("");
	};

	React.useEffect(() => {
		let timeout = setTimeout(() => {
			handleSave(form);
		}, 100);
		return () => clearTimeout(timeout);
	}, [form]);

	const handleAddField = (e) => {
		setFieldInput(e.target.value);
	};

	const handleInput = (e) => {
		setForm((form) => {
			const updatedFormFields = form.formFields.map((field) => {
				if (field.id === e.target.id) {
					return {
						...field,
						value: e.target.value,
					};
				}
				return field;
			});
			return {
				...form,
				formFields: updatedFormFields,
			};
		});
	};

	const ClearForm = () => {
		setForm((form) => {
			const updatedFormFields = form.formFields.map((field) => {
				return {
					...field,
					value: "",
				};
			});
			return {
				...form,
				formFields: updatedFormFields,
			};
		});
		setFieldInput("");
	};

	return (
		<div className="container">
			<div className="my-5 px-5">
				<form>
					<input
						type="text"
						value={form.title}
						onChange={(e) => setForm({ ...form, title: e.target.value })}
						className="form-control"
					/>
					{form.formFields.map((field) => (
						<div key={field.id} className="form-row">
							<div className="col">
								<label htmlFor={field.label}>{field.label}</label>
								<input
									id={field.id}
									value={field.value}
									className="form-control"
									onChange={handleInput}
									type={field.type}
									placeholder={field.label}
								/>
								<button
									type="button"
									onClick={() => RemoveField(field.id)}
									className="my-2 btn btn-primary">
									Remove
								</button>
							</div>
						</div>
					))}
					<div className="row">
						<div className="form-group">
							<input
								value={fieldInput}
								className="form-control"
								type="text"
								onChange={handleAddField}
								placeholder="Add new Field"
							/>
							<button
								type="button"
								onClick={AddField}
								className="mt-2 btn btn-primary">
								Add
							</button>
						</div>
					</div>
				</form>
				<div className="pt-2">
					<button
						type="submit"
						onClick={() => props.setState("listForms")}
						className="btn btn-danger">
						Submit
					</button>
					<button type="button" onClick={ClearForm} className="mx-2 btn btn-primary">
						Clear form
					</button>
				</div>
			</div>
		</div>
	);
};

export default Form;
