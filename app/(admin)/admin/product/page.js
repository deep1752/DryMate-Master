"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import Image from "next/image";
import { productsAPI, getImageUrl, handleApiError } from '@/lib/api';

export default function ProductManager({ onEdit, onAdd }) {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsAPI.getAll();
        const data = response.data.products || response.data;
        setProducts(data);
      } catch (error) {
        const { message } = handleApiError(error);
        console.error("Error fetching products:", message);
        toast.error("❌ Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (idList) => {
    const confirmed = confirm(
      `Are you sure you want to delete ${idList.length > 1 ? "these products" : "this product"}?`
    );
    if (!confirmed) return;

    try {
      // Delete products one by one with proper error handling
      for (const id of idList) {
        try {
          await productsAPI.delete(id);
        } catch (error) {
          const { message } = handleApiError(error);
          toast.error(`❌ Failed to delete product: ${message}`);
          return; // Stop if one fails
        }
      }

      toast.success("✅ Product(s) deleted successfully!");
      setProducts(products.filter((p) => !idList.includes(p.id)));
      setSelectedIds([]);
      setSelectAll(false);
    } catch (err) {
      console.error("Error deleting product(s):", err);
      const { message } = handleApiError(err);
      toast.error(`❌ Delete failed: ${message}`);
    }
  };

  const toggleProductStatus = async (product) => {
    const newStatus = product.status === "active" ? "inactive" : "active";

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", String(product.price));
    formData.append("discount", String(product.discount));
    formData.append("final_price", String(product.final_price));
    formData.append("discripction", product.discripction);
    formData.append("status", newStatus);

    try {
      await productsAPI.update(product.id, formData);

      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, status: newStatus } : p
        )
      );
      toast.success(`✅ Product is now ${newStatus}`);
    } catch (err) {
      console.error("Error updating status:", err);
      const { message } = handleApiError(err);
      toast.error(`❌ Failed to update status: ${message}`);
    }
  };

  const toggleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map((product) => product.id));
    }
    setSelectAll(!selectAll);
  };

  const sortedProducts = [...products].sort((a, b) => b.id - a.id);

  const filteredProducts = sortedProducts.filter((product) =>
    `${product.name} ${product.discripction}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Product List", 14, 10);
    autoTable(doc, {
      startY: 20,
      head: [["Name", "Price", "Discount", "Final Price", "Description", "Status"]],
      body: filteredProducts.map((p) => [
        p.name,
        p.price,
        p.discount,
        p.final_price,
        p.discripction,
        p.status,
      ]),
    });
    doc.save("products.pdf");
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredProducts.map((p) => ({
        Name: p.name,
        Price: p.price,
        Discount: p.discount,
        "Final Price": p.final_price,
        Description: p.discripction,
        Status: p.status,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "products.xlsx");
  };

  const goBack = () => {
    window.history.back();
  };
  const handleViewDescription = (product) => {
    setSelectedProduct(product);
    setShowDescriptionModal(true);
  };

  const closeDescriptionModal = () => {
    setShowDescriptionModal(false);
    setSelectedProduct(null);
  };


  if (loading) {
    return (
      <div className="loader-container">
        <p className="loader-text">🔄 Loading products...</p>
      </div>
    );
  }

  return (
    <div className="product-manager-wrapper">
      <div className="header-bar">
        <div className="product-header">
          <button onClick={goBack} className="btn-back">⬅️ Back</button>
        </div>
        <h2 className="title">Product Manager</h2>
        <div className="actions">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <Link href="/admin/product/add">
            <button className="add-button" onClick={onAdd}>
              ➕ Add
            </button>
          </Link>
          <button onClick={downloadPDF} className="download-button">
            📄 Download PDF
          </button>
          <button onClick={downloadExcel} className="download-button">
            📊 Download Excel
          </button>
          <button
            onClick={() => {
              if (selectedIds.length === 0) {
                toast.warning("⚠️ Please select at least one product to delete.");
              } else {
                handleDelete(selectedIds);
              }
            }}
            className="delete-button"
          >
            🗑️ Delete Selected ({selectedIds.length})
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                />
              </th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Final Price</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-users-found">
                  {`🔍 No products found matching "${searchTerm}"`}
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(product.id)}
                      onChange={() => toggleSelectOne(product.id)}
                    />
                  </td>
                  <td>
                    {/* <Image
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${product.image}`}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="slider-image-thumb"
                      style={{ borderRadius: "6px", objectFit: "cover" }}
                    /> */}

                    <img
                      src={getImageUrl(product.image?.url || product.image)}
                      alt={product.name}
                      className="product-image"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.discount}</td>
                  <td>{product.final_price}</td>
                  <td>
                    <button
                      className="view-desc-btn"
                      onClick={() => handleViewDescription(product)}
                    >
                      👁️ View
                    </button>
                  </td>

                  <td>
                    <button
                      className={`status-toggle-btn ${product.status === "active" ? "active" : "inactive"}`}
                      onClick={() => toggleProductStatus(product)}
                    >
                      {product.status === "active" ? "🟢 Active" : "🔴 Inactive"}
                    </button>
                  </td>
                  <td className="action-buttons">
                    <Link href={`/admin/product/edit/${product.id}`}>
                      <button className="edit-button" onClick={() => onEdit?.(product.id)}>
                        ✏️
                      </button>
                    </Link>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete([product.id])}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showDescriptionModal && selectedProduct && (
        <div className="desc-modal-overlay" onClick={closeDescriptionModal}>
          <div className="desc-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedProduct.name} - Description</h3>
            <p>{selectedProduct.discripction}</p>
            <button className="close-modal-btn" onClick={closeDescriptionModal}>
              ❌ Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
