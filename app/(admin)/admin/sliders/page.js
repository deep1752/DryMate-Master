"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import { slidersAPI, getImageUrl, handleApiError } from '@/lib/api';

export default function SliderManager({ onEdit, onAdd }) {
  const router = useRouter();
  const [sliders, setSliders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await slidersAPI.getAll();
        const data = response.data.sliders || response.data;
        console.log('Fetched sliders data:', data);
        setSliders(data);
      } catch (error) {
        const { message } = handleApiError(error);
        console.error("Error fetching sliders:", message);
        toast.error("❌ Failed to load sliders.");
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, []);

  const handleDelete = async (idList) => {
    const confirmed = confirm(
      `Are you sure you want to delete ${idList.length > 1 ? "these sliders" : "this slider"}?`
    );
    if (!confirmed) return;

    try {
      // Delete sliders one by one with proper error handling
      for (const id of idList) {
        try {
          console.log('Attempting to delete slider with ID:', id);
          await slidersAPI.delete(id);
          console.log('Successfully deleted slider:', id);
        } catch (error) {
          console.error('Delete error details:', {
            id,
            status: error.response?.status,
            data: error.response?.data,
            url: error.config?.url
          });
          const { message } = handleApiError(error);
          toast.error(`❌ Failed to delete slider: ${message}`);
          return; // Stop if one fails
        }
      }

      toast.success("✅ Slider(s) deleted successfully!");
      setSliders(sliders.filter((slider) => !idList.includes(slider.id)));
      setSelectedIds([]);
      setSelectAll(false);
    } catch (err) {
      console.error("Error deleting slider(s):", err);
      const { message } = handleApiError(err);
      toast.error(`❌ Delete failed: ${message}`);
    }
  };

  const toggleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const toggleSliderStatus = async (slider) => {
    const newStatus = slider.status === "active" ? "inactive" : "active";

    const formData = new FormData();
    formData.append("title", slider.title);
    formData.append("subtitle", slider.subtitle);
    formData.append("status", newStatus);

    try {
      await slidersAPI.update(slider.id, formData);
      
      setSliders((prev) =>
        prev.map((s) =>
          s.id === slider.id ? { ...s, status: newStatus } : s
        )
      );
      toast.success(`✅ Slider is now ${newStatus}`);
    } catch (err) {
      console.error("Error updating status:", err);
      const { message } = handleApiError(err);
      toast.error(`❌ Failed to update status: ${message}`);
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredSliders.map((slider) => slider.id));
    }
    setSelectAll(!selectAll);
  };

  const sortedSliders = [...sliders].sort((a, b) => b.id - a.id);

  const filteredSliders = sortedSliders.filter((slider) =>
    `${slider.title} ${slider.subtitle}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Slider List", 14, 10);
    autoTable(doc, {
      startY: 20,
      head: [["Title", "Subtitle", "Status"]],
      body: filteredSliders.map((slider) => [
        slider.title,
        slider.subtitle,
        slider.status,
      ]),
    });
    doc.save("sliders.pdf");
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredSliders.map((slider) => ({
        Title: slider.title,
        Subtitle: slider.subtitle,
        Status: slider.status,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sliders");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "sliders.xlsx");
  };

  const goBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="loader-container">
        <p className="loader-text">🔄 Loading sliders...</p>
      </div>
    );
  }

  return (
    <div className="product-manager-wrapper">
      <div className="header-bar">
        <div className="product-header">
          <button onClick={goBack} className="btn-back">⬅️ Back</button>
        </div>
        <h2 className="title">Slider Manager</h2>
        <div className="actions">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <Link href="/admin/sliders/add">
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
                toast.warning("⚠️ Please select at least one slider to delete.");
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
              <th>Title</th>
              <th>Subtitle</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredSliders.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-users-found">
                  🔍 No sliders found matching &quot;{searchTerm}&quot;
                </td>
              </tr>
            ) : (
              filteredSliders.map((slider) => (
                <tr key={slider.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(slider.id)}
                      onChange={() => toggleSelectOne(slider.id)}
                    />
                  </td>
                  <td>
                    <img
                      src={getImageUrl(slider.image?.url || slider.image)}
                      alt={slider.title}
                      width={80}
                      height={60}
                      className="slider-image-thumb"
                      style={{ borderRadius: "6px", objectFit: "cover" }}
                    />
                 
                  </td>
                  <td>{slider.title}</td>
                  <td>{slider.subtitle}</td>
                  <td>
                    <button
                      className={`status-toggle-btn ${slider.status === "active" ? "active" : "inactive"}`}
                      onClick={() => toggleSliderStatus(slider)}
                    >
                      {slider.status === "active" ? "🟢 Active" : "🔴 Inactive"}
                    </button>
                  </td>
                  <td className="action-buttons">
                    <Link href={`/admin/sliders/edit/${slider.id}`}>
                      <button className="edit-button" onClick={() => onEdit?.(slider.id)}>
                        ✏️
                      </button>
                    </Link>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete([slider.id])}
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
    </div>
  );
}
