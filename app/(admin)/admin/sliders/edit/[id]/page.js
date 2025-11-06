"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { slidersAPI, getImageUrl, handleApiError } from '@/lib/api';

export default function EditSlider() {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    status: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [existingImage, setExistingImage] = useState(null);
  const router = useRouter();
  const { id: sliderId } = useParams();

  useEffect(() => {
    if (!sliderId) return;

    const fetchSlider = async () => {
      try {
        const response = await slidersAPI.getById(sliderId);
        const slider = response.data.slider || response.data;
        
        setFormData({
          title: slider.title || "",
          subtitle: slider.subtitle || "",
          status: slider.status || "active",
          image: null,
        });

        setExistingImage(getImageUrl(slider.image?.url || slider.image));
      } catch (error) {
        const { message } = handleApiError(error);
        console.error("Error fetching slider:", message);
        toast.error("❌ Failed to load slider data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSlider();
  }, [sliderId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    setExistingImage(null); // Hide old image preview
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.subtitle.trim()) newErrors.subtitle = "Subtitle is required";
    if (!formData.status.trim()) newErrors.status = "Status is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("❗ Please correct all required fields.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("subtitle", formData.subtitle);
    data.append("status", formData.status);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const res = await slidersAPI.update(sliderId, data);
      toast.success("✅ Slider updated successfully!");
      router.push("/admin/sliders");
    } catch (error) {
      console.error("Update error:", error);
      const { message } = handleApiError(error);
      toast.error(`❌ Update failed: ${message}`);
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <p className="loader-text">🔄 Loading slider...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <button
        type="button"
        onClick={() => router.push("/admin/sliders")}
        className="back-btn"
      >
        ◀ Back
      </button>

      <table className="edit-table">
        <tbody>
          <tr className="edit-row">
            <td className="edit-label">Title</td>
            <td className="edit-input-cell">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`edit-input ${errors.title ? "input-error" : ""}`}
                required
              />
              {errors.title && (
                <small className="error-text">{errors.title}</small>
              )}
            </td>
          </tr>

          <tr className="edit-row">
            <td className="edit-label">Subtitle</td>
            <td className="edit-input-cell">
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                className={`edit-input ${errors.subtitle ? "input-error" : ""}`}
                required
              />
              {errors.subtitle && (
                <small className="error-text">{errors.subtitle}</small>
              )}
            </td>
          </tr>

          <tr className="edit-row">
            <td className="edit-label">Status</td>
            <td className="edit-input-cell">
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={`edit-input ${errors.status ? "input-error" : ""}`}
                required
              >
                <option value="">-- Select Status --</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status && (
                <small className="error-text">{errors.status}</small>
              )}
            </td>
          </tr>

          <tr className="edit-row">
            <td className="edit-label">Upload Image</td>
            <td className="edit-input-cell">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="form-input"
              />
              {(formData.image || existingImage) && (
                <div style={{ marginTop: "10px" }}>
                  <strong>Preview:</strong>
                  <br />
                  <img
                    src={
                      formData.image
                        ? URL.createObjectURL(formData.image)
                        : existingImage
                    }
                    alt="Preview"
                    style={{
                      maxWidth: "200px",
                      marginTop: "8px",
                      borderRadius: "6px",
                    }}
                  />
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="edit-submit-container">
        <button type="submit" className="edit-submit-button">
          Update Slider
        </button>
      </div>
    </form>
  );
}
