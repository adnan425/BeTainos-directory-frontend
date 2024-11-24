import { useCategories } from '@/app/hooks/useAPIs';
import { addProfSchema } from '@/app/validation/registrationSchema';
import PlusIcon from '@rsuite/icons/Plus';
import TrashIcon from '@rsuite/icons/Trash';
import { getSession } from 'next-auth/react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
    Button,
    ButtonToolbar,
    Divider,
    Form,
    IconButton,
    Input,
    Message,
    SelectPicker,
    Stack,
    Text
} from 'rsuite';

const Textarea = React.forwardRef<HTMLInputElement, any>((props, ref: any) => (
    <Input {...props} as="textarea" ref={ref} />
));
Textarea.displayName = "TextArea";

interface IState {
    logo: string;
    name: string;
    postalAddress: string;
    phone: string;
    email: string;
    website: string;
    socials: {
        icon: string;
        link: string;
        name: string;
    }[];
    categoriesList: string;
    description: string;
    ServicesOffered: string;
    officeHours: string;
}

const initialState: IState = {
    logo: '',
    name: '',
    postalAddress: '',
    phone: '',
    email: '',
    website: '',
    socials: [],
    categoriesList: '',
    description: '',
    ServicesOffered: '',
    officeHours: ''
};

const AddProfessional = () => {
    const [data, setData] = useState<IState>(initialState);
    const [formError, setFormError] = useState<{ [key: string]: string }>({});
    const { data: catList, isLoading: catLoading } = useCategories();
    const [isLoading, setIsLoading] = useState(false)
    const handleChange = (value: Partial<IState>) => {
        setData({ ...data, ...value });
    };

    const validate = () => {
        const { error } = addProfSchema.validate(data, { abortEarly: false });

        if (error) {
            const errors: { [key: string]: string } = {};
            error.details.forEach((err: any) => {
                errors[err?.context.key] = err.message;
            });
            setFormError(errors);
            return false;
        }

        setFormError({});
        return true;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!validate()) {
            console.log('Validation failed:', JSON.stringify(formError));
            return;
        }
        try {
            // Prepare FormData object
            const formData = new FormData();

            // Append fields to FormData
            // formData.append('logo', data.logo);
            formData.append('Name', data.name);
            formData.append('PostelAddress', data.postalAddress);
            formData.append('Phone', data.phone);
            formData.append('Email', data.email);
            formData.append('Website', data.website);
            formData.append('Description', data.description);
            formData.append('ServicesOffered', data.ServicesOffered);
            formData.append('officeHours', data.officeHours);

            // Add array fields as JSON strings
            formData.append('Category', data.categoriesList);

            setIsLoading(true)
            const session = await getSession();  // Retrieve the session from NextAuth.js

            // Make API call
            const response = await fetch('/api/addProf', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session?.user?.token}`,
                    // 'Content-Type': 'multipart/form-data'
                },
                body: formData,
            });
            if (response.ok) {
                setData(initialState)
                setIsLoading(false)
                toast.success("Successfully submitted.")
            } else {
                const error = await response.json();
                setIsLoading(false)
                console.error('Error submitting data:', error);
            }
        } catch (error) {
            setIsLoading(false)
            console.error('Unexpected error:', error);
        }
    };


    const handleAddSocial = () => {
        setData(prevData => ({
            ...prevData,
            socials: [...prevData.socials, { icon: '', link: '', name: '' }]
        }));
    };

    const handleDeleteSocial = (index: number) => {
        setData(prevData => ({
            ...prevData,
            socials: prevData.socials.filter((_, i) => i !== index)
        }));
    };

    const handleSocialChange = (index: number, field: keyof IState["socials"][0], value: string) => {
        const updatedSocials = [...data.socials];
        updatedSocials[index][field] = value;
        setData({ ...data, socials: updatedSocials });
    };



    const catsList = catList?.map(item => ({ label: item.Name, value: item.Name }));

    return (
        <div className='profile-box generictab-box'>
            <Message>
                Please fill out the form below to add company details. Fields marked as required must be completed. You can add multiple social links by clicking &quot;Add Social&quot; and remove any entry with the delete icon.
            </Message>
            <Divider />
            <Form className="basic-form row" onSubmit={(e: any) => e.preventDefault()} layout="horizontal">
                <Form.Group controlId="name" className='col-lg-6'>
                    <Form.ControlLabel>Name*</Form.ControlLabel>
                    <Form.Control name="name" value={data.name} onChange={(value) => handleChange({ name: value })} />
                    {formError.name && <Form.HelpText style={{ color: 'red', marginLeft: "0px" }}>{formError.name}</Form.HelpText>}
                </Form.Group>

                <Form.Group controlId="postalAddress" className='col-lg-6'>
                    <Form.ControlLabel>Postal Address*</Form.ControlLabel>
                    <Form.Control
                        name="postalAddress"
                        accepter={Textarea}
                        value={data.postalAddress}
                        onChange={(value) => handleChange({ postalAddress: value })}
                    />
                    {formError.postalAddress && <Form.HelpText style={{ color: 'red', marginLeft: "0px" }}>{formError.postalAddress}</Form.HelpText>}
                </Form.Group>

                <Form.Group controlId="phone" className='col-lg-6'>
                    <Form.ControlLabel>Phone*</Form.ControlLabel>
                    <Form.Control name="phone" value={data.phone} onChange={(value) => handleChange({ phone: value })} />
                    {formError.phone && <Form.HelpText style={{ color: 'red', marginLeft: "0px" }}>{formError.phone}</Form.HelpText>}
                </Form.Group>

                <Form.Group controlId="email" className='col-lg-6'>
                    <Form.ControlLabel>Email*</Form.ControlLabel>
                    <Form.Control name="email" value={data.email} onChange={(value) => handleChange({ email: value })} />
                    {formError.email && <Form.HelpText style={{ color: 'red', marginLeft: "0px" }}>{formError.email}</Form.HelpText>}
                </Form.Group>

                <Form.Group controlId="website" className='col-lg-6'>
                    <Form.ControlLabel>Website</Form.ControlLabel>
                    <Form.Control name="website" value={data.website} onChange={(value) => handleChange({ website: value })} />
                    {formError.website && <Form.HelpText style={{ color: 'red', marginLeft: "0px" }}>{formError.website}</Form.HelpText>}
                </Form.Group>


                <Form.Group controlId="categories" className='col-lg-6'>
                    <Form.ControlLabel>Categories*</Form.ControlLabel>
                    <Form.Control
                        name="categories"
                        accepter={SelectPicker}
                        data={catsList || []}
                        loading={catLoading}
                        onChange={(value) => handleChange({ categoriesList: value })}
                    />
                    {formError.categoriesList && <Form.HelpText style={{ color: 'red', marginLeft: "0px" }}>{formError.categoriesList}</Form.HelpText>}

                </Form.Group>

                <Form.Group controlId="description" className='col-lg-6'>
                    <Form.ControlLabel>Description*</Form.ControlLabel>
                    <Form.Control
                        name="description"
                        accepter={Textarea}
                        rows={3}
                        value={data.description}
                        onChange={(value) => handleChange({ description: value })}
                    />
                    {formError.description && <Form.HelpText style={{ color: 'red', marginLeft: "0px" }}>{formError.description}</Form.HelpText>}
                </Form.Group>
                <Form.Group controlId="servicesOffered" className='col-lg-6'>
                    <Form.ControlLabel>ServicesOffered*</Form.ControlLabel>
                    <Form.Control
                        name="ServicesOffered"
                        accepter={Textarea}
                        rows={3}
                        value={data.ServicesOffered}
                        onChange={(value) => handleChange({ ServicesOffered: value })}
                    />
                    {formError.ServicesOffered && <Form.HelpText style={{ color: 'red', marginLeft: "0px" }}>{formError.ServicesOffered}</Form.HelpText>}
                </Form.Group>
                <Form.Group controlId="officeHours" className='col-lg-6'>
                    <Form.ControlLabel>officeHours*</Form.ControlLabel>
                    <Form.Control
                        name="officeHours"
                        accepter={Textarea}
                        rows={3}
                        value={data.officeHours}
                        onChange={(value) => handleChange({ officeHours: value })}
                    />
                    {formError.officeHours && <Form.HelpText style={{ color: 'red', marginLeft: "0px" }}>{formError.officeHours}</Form.HelpText>}
                </Form.Group>
                <Form.Group controlId="socials" className='col-lg-6'>
                    <Stack justifyContent='flex-start' alignItems='center' spacing={8}>
                        <Text weight='bold'>Socials</Text>
                        <IconButton disabled icon={<PlusIcon />} appearance="primary" onClick={handleAddSocial} />
                    </Stack>
                    {data.socials.map((social, index) => (
                        <div key={index} style={{ marginBottom: '10px' }}>
                            <Form.Group controlId={`socials-name-${index}`}>
                                <Form.ControlLabel>Name</Form.ControlLabel>
                                <Form.Control
                                    name={`socials-${index}-name`}
                                    value={social.name}
                                    onChange={(value) => handleSocialChange(index, 'name', value)}
                                />
                                {formError[`socials.${index}.name`] && <Form.HelpText style={{ color: 'red', marginLeft: "0px" }}>{formError[`socials.${index}.name`]}</Form.HelpText>}
                            </Form.Group>
                            <Form.Group controlId={`socials-link-${index}`}>
                                <Form.ControlLabel>Link</Form.ControlLabel>
                                <Form.Control
                                    name={`socials-${index}-link`}
                                    value={social.link}
                                    onChange={(value) => handleSocialChange(index, 'link', value)}
                                />
                                {formError[`socials.${index}.link`] && <Form.HelpText style={{ color: 'red', marginLeft: "0px" }}>{formError[`socials.${index}.link`]}</Form.HelpText>}
                            </Form.Group>
                            <IconButton icon={<TrashIcon />} appearance="ghost" color="red" onClick={() => handleDeleteSocial(index)} />
                        </div>
                    ))}
                </Form.Group>
                <Form.Group controlId="logo" className='col-lg-6'>
                    <Form.ControlLabel>Logo</Form.ControlLabel>
                    <input
                        disabled
                        className='form-control'
                        type="file"
                        accept="image/*"
                        name="logo"
                        onChange={(event) => {
                            console.log(event)
                            const file = event.target.files?.[0];
                            if (file) {
                                // Validate file type
                                if (!file.type.startsWith('image/')) {
                                    setFormError((prev) => ({
                                        ...prev,
                                        logo: 'Only image files are allowed',
                                    }));
                                    return;
                                }

                                // Validate file size (e.g., max 5MB)
                                if (file.size > 5 * 1024 * 1024) {
                                    setFormError((prev) => ({
                                        ...prev,
                                        logo: 'File size exceeds 5MB limit',
                                    }));
                                    return;
                                }

                                setFormError((prev) => ({ ...prev, logo: '' })); // Clear any previous errors
                                handleChange({ logo: file.name }); // Save file name or the file object
                            } else {
                                // Clear the logo field and any error if no file is selected
                                setFormError((prev) => ({ ...prev, logo: '' }));
                                handleChange({ logo: '' });
                            }
                        }}
                    />
                    {formError.logo && <Form.HelpText style={{ color: 'red', marginLeft: "0px" }}>{formError.logo}</Form.HelpText>}
                </Form.Group>

                <Form.Group>
                    <ButtonToolbar>
                        <Button loading={isLoading} appearance="primary" block onClick={handleSubmit}>Submit</Button>
                    </ButtonToolbar>
                </Form.Group>
            </Form>
        </div>
    );
};

export default AddProfessional;