"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { slidersAPI, handleApiError } from '@/lib/api';

const defaultSlider = {
    title: "",
    subtitle: "",
    status: "active",
    image: null,
};

export default function AddSlider() {
    const [sliders, setSliders] = useState([{ ...defaultSlider }]);
    const [errors, setErrors] = useState([{}]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (index, field, value) => {
        const updated = [...sliders];
        updated[index][field] = value;
        setSliders(updated);

        const updatedErrors = [...errors];
        if (updatedErrors[index]) updatedErrors[index][field] = "";
        setErrors(updatedErrors);
    };

    const handleImageChange = (index, file) => {
        const updated = [...sliders];
        updated[index].image = file;
        setSliders(updated);

        const updatedErrors = [...errors];
        if (updatedErrors[index]) updatedErrors[index].image = "";
        setErrors(updatedErrors);
    };

    const addRow = () => {
        setSliders([{ ...defaultSlider }, ...sliders]);
        setErrors([{}, ...errors]);
    };

    const removeRow = (index) => {
        if (sliders.length === 1) {
            toast.warning("⚠️ You cannot remove the last remaining slider row.");
            return;
        }
        setSliders(sliders.filter((_, i) => i !== index));
        setErrors(errors.filter((_, i) => i !== index));
    };

    const validate = () => {
        let hasError = false;
        const newErrors = sliders.map((s) => {
            const fieldErrors = {};
            if (!s.title.trim()) fieldErrors.title = "Title is required";
            if (!s.subtitle.trim()) fieldErrors.subtitle = "Subtitle is required";
            if (!s.status.trim()) fieldErrors.status = "Status is required";
            if (!s.image) fieldErrors.image = "Image is required";
            if (Object.keys(fieldErrors).length > 0) hasError = true;
            return fieldErrors;
        });
        setErrors(newErrors);
        return !hasError;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            toast.error("❗ Please correct errors before submitting.");
            return;
        }

        setLoading(true);
        try {
            for (const slider of sliders) {
                const formData = new FormData();
                formData.append("title", slider.title);
                formData.append("subtitle", slider.subtitle);
                formData.append("status", slider.status);
                formData.append("image", slider.image);

                try {
                    const res = await slidersAPI.create(formData);
                    console.log(`✅ Successfully added slider: ${slider.title}`);
                } catch (error) {
                    const { message } = handleApiError(error);
                    toast.error(`❌ Failed to add "${slider.title}": ${message}`);
                    console.error("Slider upload error:", error);
                    setLoading(false);
                    return; // Stop processing if one slider fails
                }
            }

            toast.success("✅ All sliders added successfully!");
            router.push("/admin/sliders");
        } catch (error) {
            console.error("Submission error:", error);
            const { message } = handleApiError(error);
            toast.error(`❌ Submission failed: ${message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="product-add-container">
            {loading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                    <p className="loading-text">Submitting sliders...</p>
                </div>
            )}

            <h1 className="product-add-heading">Add Sliders</h1>
            <button type="button" onClick={() => router.push("/admin/slider")} className="back-btn">
                ◀ Back
            </button>

            <form onSubmit={handleSubmit}>
                <div className="product-table-wrapper">
                    <table className="product-table">
                        <thead className="product-table-header">
                            <tr>
                                <th>Title</th>
                                <th>Subtitle</th>
                                <th>Status</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sliders.map((slider, index) => (
                                <tr key={index} className="product-table-row">
                                    <td>
                                        <input
                                            type="text"
                                            value={slider.title}
                                            onChange={(e) => handleChange(index, "title", e.target.value)}
                                            className={`product-input ${errors[index]?.title ? "input-error" : ""}`}
                                            placeholder="Slider Title"
                                        />
                                        {errors[index]?.title && <small className="error-text">{errors[index].title}</small>}
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={slider.subtitle}
                                            onChange={(e) => handleChange(index, "subtitle", e.target.value)}
                                            className={`product-input ${errors[index]?.subtitle ? "input-error" : ""}`}
                                            placeholder="Slider Subtitle"
                                        />
                                        {errors[index]?.subtitle && <small className="error-text">{errors[index].subtitle}</small>}
                                    </td>
                                    <td>
                                        <select
                                            value={slider.status}
                                            onChange={(e) => handleChange(index, "status", e.target.value)}
                                            className={`product-input ${errors[index]?.status ? "input-error" : ""}`}
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                        {errors[index]?.status && <small className="error-text">{errors[index].status}</small>}
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(index, e.target.files[0])}
                                            className={`product-input ${errors[index]?.image ? "input-error" : ""}`}
                                        />
                                        {slider.image && (
                                            <img
                                                src={URL.createObjectURL(slider.image)}
                                                alt="Preview"
                                                className="small-preview"
                                            />

                                        )}
                                        {errors[index]?.image && <small className="error-text">{errors[index].image}</small>}
                                    </td>
                                    <td className="text-center">
                                        <button type="button" onClick={() => removeRow(index)} className="remove-btn">
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="product-actions">
                    <button type="button" onClick={addRow} className="btn add-btn">
                        + Add Slider
                    </button>
                    <button type="submit" className="btn submit-btn" disabled={loading}>
                        {loading ? "Submitting..." : "Submit All"}
                    </button>
                </div>
            </form>
        </div>
    );
}
