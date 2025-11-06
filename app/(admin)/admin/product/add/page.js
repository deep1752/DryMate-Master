"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { productsAPI, handleApiError } from '@/lib/api';

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
    // Discount is a percentage, so calculate: price - (price * discount / 100)
    updated[index].final_price = (price - (price * discount / 100)).toFixed(2);

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
      // Image is optional
      // if (!p.image) fieldErrors.image = "Image is required";
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
        try {
          const formData = new FormData();
          formData.append("name", product.name.trim());
          formData.append("price", String(parseFloat(product.price) || 0));
          formData.append("discount", String(parseFloat(product.discount) || 0));
          formData.append("final_price", String(parseFloat(product.final_price) || 0));
          formData.append("discripction", product.discripction.trim());
          formData.append("status", product.status || "active");
          if (product.image) {
            formData.append("image", product.image);
          }

          // Debug: Log what we're sending
          console.log('Sending product data:', {
            name: product.name,
            price: parseFloat(product.price) || 0,
            discount: parseFloat(product.discount) || 0,
            final_price: parseFloat(product.final_price) || 0,
            discripction: product.discripction,
            status: product.status,
            hasImage: !!product.image
          });

          const res = await productsAPI.create(formData);
          console.log(`✅ Successfully added: ${product.name}`);
        } catch (productError) {
          const { message } = handleApiError(productError);
          console.error("Full error details:", {
            status: productError.response?.status,
            data: productError.response?.data,
            message: message
          });
          toast.error(`❌ Failed to add "${product.name}": ${message}`);
          setLoading(false);
          return; // Stop processing if one product fails
        }
      }

      toast.success("✅ All products added successfully!");
      router.push("/admin/product");
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
