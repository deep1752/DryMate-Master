"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const defaultProduct = {
  name: "",
  price: "",
  discount: "",
  final_price: "",
  discripction: "",
  status: "",
  image: null,
};

export default function AddProduct() {
  const [products, setProducts] = useState([{ ...defaultProduct }]);
  const [errors, setErrors] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (index, field, value) => {
    const updated = [...products];

    if (["price", "discount"].includes(field)) {
      value = value.replace(/\D/g, "");
    }

    updated[index][field] = value;

    // Calculate final_price when price or discount changes
    const price = parseFloat(updated[index].price) || 0;
    const discount = parseFloat(updated[index].discount) || 0;
    updated[index].final_price = (price - discount).toFixed(2);

    setProducts(updated);

    const updatedErrors = [...errors];
    if (updatedErrors[index]) updatedErrors[index][field] = "";
    setErrors(updatedErrors);
  };

  const handleImageChange = (index, file) => {
    const updated = [...products];
    updated[index].image = file;
    setProducts(updated);

    const updatedErrors = [...errors];
    if (updatedErrors[index]) updatedErrors[index].image = "";
    setErrors(updatedErrors);
  };

  const addRow = () => {
    setProducts([{ ...defaultProduct }, ...products]);
    setErrors([{}, ...errors]);
  };

  const removeRow = (index) => {
    if (products.length === 1) {
      toast.warning("⚠️ You cannot remove the last remaining product row.");
      return;
    }
    setProducts(products.filter((_, i) => i !== index));
    setErrors(errors.filter((_, i) => i !== index));
  };

  const validate = () => {
    let hasError = false;
    const newErrors = products.map((p) => {
      const fieldErrors = {};
      if (!p.name.trim()) fieldErrors.name = "Name is required";
      if (!p.price.trim()) fieldErrors.price = "Price is required";
      if (!p.discount.trim()) fieldErrors.discount = "Discount is required";
      if (!p.final_price.trim()) fieldErrors.final_price = "Final price is required";
      if (!p.discripction.trim()) fieldErrors.discripction = "Description is required";
      if (!p.status.trim()) fieldErrors.status = "Status is required";
      if (!p.image) fieldErrors.image = "Image is required";
      return fieldErrors;
    });
    setErrors(newErrors);
    return !newErrors.some(err => Object.keys(err).length > 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("❗ Please correct errors before submitting.");
      return;
    }

    setLoading(true);
    try {
      for (const product of products) {
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("price", product.price);
        formData.append("discount", product.discount);
        formData.append("final_price", product.final_price);
        formData.append("discripction", product.discripction);
        formData.append("status", product.status);
        formData.append("image", product.image);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/post`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const err = await res.text();
          toast.error(`❌ Failed to add: ${product.name}`);
          console.error("Upload error:", err);
          setLoading(false);
          return;
        }
      }

      toast.success("✅ Products added successfully!");
      router.push("/admin/product");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-add-container">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p className="loading-text">Submitting products...</p>
        </div>
      )}

      <h1 className="product-add-heading">Add Products</h1>
      <button type="button" onClick={() => router.push("/admin/products")} className="back-btn">
        ◀ Back
      </button>

      <form onSubmit={handleSubmit}>
        <div className="product-table-wrapper">
          <table className="product-table">
            <thead className="product-table-header">
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Final Price</th>
                <th>Description</th>
                <th>Status</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="product-table-row">
                  <td>
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => handleChange(index, "name", e.target.value)}
                      className={`product-input ${errors[index]?.name ? "input-error" : ""}`}
                      placeholder="Name"
                    />
                    {errors[index]?.name && <small className="error-text">{errors[index].name}</small>}
                  </td>
                  <td>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={product.price}
                      onChange={(e) => handleChange(index, "price", e.target.value)}
                      className={`product-input ${errors[index]?.price ? "input-error" : ""}`}
                      placeholder="Price"
                    />
                    {errors[index]?.price && <small className="error-text">{errors[index].price}</small>}
                  </td>
                  <td>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={product.discount}
                      onChange={(e) => handleChange(index, "discount", e.target.value)}
                      className={`product-input ${errors[index]?.discount ? "input-error" : ""}`}
                      placeholder="Discount"
                    />
                    {errors[index]?.discount && <small className="error-text">{errors[index].discount}</small>}
                  </td>
                  <td>
                    <input
                      type="text"
                      value={product.final_price}
                      readOnly
                      className="product-input readonly-field"
                      placeholder="Final Price"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={product.discripction}
                      onChange={(e) => handleChange(index, "discripction", e.target.value)}
                      className={`product-input ${errors[index]?.discripction ? "input-error" : ""}`}
                      placeholder="Description"
                    />
                    {errors[index]?.discripction && <small className="error-text">{errors[index].discripction}</small>}
                  </td>
                  <td>
                    <select
                      value={product.status}
                      onChange={(e) => handleChange(index, "status", e.target.value)}
                      className={`product-input ${errors[index]?.status ? "input-error" : ""}`}
                    >
                      <option value="">Select status</option>
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
                    {product.image && (
                      <img
                        src={URL.createObjectURL(product.image)}
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
            + Add Product
          </button>
          <button type="submit" className="btn submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit All"}
          </button>
        </div>
      </form>
    </div>
  );
}
