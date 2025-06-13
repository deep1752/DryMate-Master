"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";

export default function EditProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discount: "",
    final_price: "",
    discripction: "",
    status: "active",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [existingImage, setExistingImage] = useState(null);
  const router = useRouter();
  const { id: productId } = useParams();

  useEffect(() => {
    if (!productId) return;

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/get_by_id${productId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then((product) => {
        setFormData({
          name: product.name || "",
          price: product.price || "",
          discount: product.discount || "",
          final_price: product.final_price || "",
          discripction: product.discripction || "",
          status: product.status || "active",
          image: null,
        });
        setExistingImage(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${product.image}`);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        toast.error("❌ Failed to load product data.");
        setLoading(false);
      });
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update formData
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // Auto-calculate final_price when price or discount changes
      const price = parseFloat(updated.price) || 0;
      const discount = parseFloat(updated.discount) || 0;
      updated.final_price = (price - discount).toFixed(2);

      return updated;
    });

    // Clear error for this field
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    setExistingImage(null);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.discount) newErrors.discount = "Discount is required";
    if (!formData.final_price) newErrors.final_price = "Final price is required";
    if (!formData.discripction.trim()) newErrors.discripction = "Description is required";
    if (!formData.status) newErrors.status = "Status is required";
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
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("discount", formData.discount);
    data.append("final_price", formData.final_price);
    data.append("discripction", formData.discripction);
    data.append("status", formData.status);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/update/${productId}`, {
        method: "PUT",
        body: data,
      });

      if (res.ok) {
        toast.success("✅ Product updated successfully!");
        router.push("/admin/product");
      } else {
        const text = await res.text();
        try {
          const json = JSON.parse(text);
          toast.error(`❌ Update failed: ${json.detail || "Unknown error"}`);
        } catch {
          toast.error(`❌ Update failed: ${text || res.statusText}`);
        }
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("❌ Something went wrong during update.");
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <p className="loader-text">🔄 Loading product...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <button
        type="button"
        onClick={() => router.push("/admin/product")}
        className="back-btn"
      >
        ◀ Back
      </button>

      <table className="edit-table">
        <tbody>
          <tr className="edit-row">
            <td className="edit-label">Name</td>
            <td className="edit-input-cell">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`edit-input ${errors.name ? "input-error" : ""}`}
              />
              {errors.name && <small className="error-text">{errors.name}</small>}
            </td>
          </tr>

          <tr className="edit-row">
            <td className="edit-label">Price</td>
            <td className="edit-input-cell">
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`edit-input ${errors.price ? "input-error" : ""}`}
              />
              {errors.price && <small className="error-text">{errors.price}</small>}
            </td>
          </tr>

          <tr className="edit-row">
            <td className="edit-label">Discount</td>
            <td className="edit-input-cell">
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className={`edit-input ${errors.discount ? "input-error" : ""}`}
              />
              {errors.discount && <small className="error-text">{errors.discount}</small>}
            </td>
          </tr>

          <tr className="edit-row">
            <td className="edit-label">Final Price</td>
            <td className="edit-input-cell">
              <input
                type="number"
                name="final_price"
                value={formData.final_price}
                onChange={handleChange}
                className={`edit-input ${errors.final_price ? "input-error" : ""}`}
              />
              {errors.final_price && <small className="error-text">{errors.final_price}</small>}
            </td>
          </tr>

          <tr className="edit-row">
            <td className="edit-label">Description</td>
            <td className="edit-input-cell">
              <textarea
                name="discripction"
                value={formData.discripction}
                onChange={handleChange}
                className={`edit-input ${errors.discripction ? "input-error" : ""}`}
              ></textarea>
              {errors.discripction && (
                <small className="error-text">{errors.discripction}</small>
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
              >
                <option value="">-- Select Status --</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status && <small className="error-text">{errors.status}</small>}
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
          Update Product
        </button>
      </div>
    </form>
  );
}
