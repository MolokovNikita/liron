import { useState, useEffect, useRef } from "react";
import styles from "../styles/admin.module.css";
import config from "../config/config";
import axios from "axios";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("companies");
  const [loading, setLoading] = useState(false);

  const [companies, setCompanies] = useState([]);
  const [mattresses, setMattresses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [types, setTypes] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [rigidities, setRigidities] = useState([]);
  const [clothingTypes, setClothingTypes] = useState([]);

  const [editingCompany, setEditingCompany] = useState(null);
  const [editingMattress, setEditingMattress] = useState(null);
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [showMattressForm, setShowMattressForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("admin_auth") === "true") {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [companiesRes, mattressesRes, reviewsRes, typesRes, shapesRes, rigiditiesRes, galleryRes, clothingRes] =
        await Promise.all([
          axios.get(`${config.API_URL}/admin/companies`),
          axios.get(`${config.API_URL}/admin/mattresses`),
          axios.get(`${config.API_URL}/admin/reviews`),
          axios.get(`${config.API_URL}/admin/types`),
          axios.get(`${config.API_URL}/admin/shapes`),
          axios.get(`${config.API_URL}/admin/rigidities`),
          axios.get(`${config.API_URL}/admin/gallery`),
          axios.get(`${config.API_URL}/admin/clothing-types`),
        ]);
      setCompanies(companiesRes.data);
      setMattresses(mattressesRes.data);
      setReviews(reviewsRes.data);
      setTypes(typesRes.data);
      setShapes(shapesRes.data);
      setRigidities(rigiditiesRes.data);
      setGallery(galleryRes.data);
      setClothingTypes(clothingRes.data);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
      alert("Ошибка загрузки данных");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.API_URL}/admin/login`, { username, password });
      if (response.data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("admin_auth", "true");
        loadData();
      } else {
        alert("Неверные учетные данные");
      }
    } catch {
      alert("Ошибка авторизации");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_auth");
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h2>Админ-панель</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Логин"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Войти</button>
          </form>
        </div>
      </div>
    );
  }

  const TABS = [
    { key: "companies", label: "Компании" },
    { key: "mattresses", label: "Матрасы" },
    { key: "clothingTypes", label: "Типы тканей" },
    { key: "reviews", label: "Отзывы" },
    { key: "gallery", label: "Галерея" },
    { key: "settings", label: "Настройки" },
  ];

  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminHeader}>
        <h1>Админ-панель</h1>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Выйти
        </button>
      </div>

      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={activeTab === tab.key ? styles.active : ""}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading && <div className={styles.loadingBar}>Загрузка...</div>}

      <div className={styles.content}>
        {activeTab === "companies" && (
          <CompaniesTab
            companies={companies}
            onEdit={(c) => { setEditingCompany(c); setShowCompanyForm(true); }}
            onDelete={async (id) => {
              if (!confirm("Удалить компанию?")) return;
              try {
                await axios.delete(`${config.API_URL}/admin/companies/${id}`);
                loadData();
              } catch { alert("Ошибка удаления"); }
            }}
            onAdd={() => { setEditingCompany(null); setShowCompanyForm(true); }}
            showForm={showCompanyForm}
            onCloseForm={() => setShowCompanyForm(false)}
            editingCompany={editingCompany}
            onSave={loadData}
          />
        )}

        {activeTab === "mattresses" && (
          <MattressesTab
            mattresses={mattresses}
            companies={companies}
            types={types}
            shapes={shapes}
            rigidities={rigidities}
            clothingTypes={clothingTypes}
            onEdit={(m) => { setEditingMattress(m); setShowMattressForm(true); }}
            onDelete={async (id) => {
              if (!confirm("Удалить матрас?")) return;
              try {
                await axios.delete(`${config.API_URL}/admin/mattresses/${id}`);
                loadData();
              } catch { alert("Ошибка удаления"); }
            }}
            onAdd={() => { setEditingMattress(null); setShowMattressForm(true); }}
            showForm={showMattressForm}
            onCloseForm={() => setShowMattressForm(false)}
            editingMattress={editingMattress}
            onSave={loadData}
          />
        )}

        {activeTab === "clothingTypes" && (
          <ClothingTypesTab clothingTypes={clothingTypes} onRefresh={loadData} />
        )}

        {activeTab === "reviews" && (
          <ReviewsTab
            reviews={reviews}
            onDelete={async (filename) => {
              if (!confirm("Удалить отзыв?")) return;
              try {
                await axios.delete(`${config.API_URL}/admin/reviews/${filename}`);
                loadData();
              } catch { alert("Ошибка удаления"); }
            }}
            onAdd={() => setShowReviewForm(true)}
            showForm={showReviewForm}
            onCloseForm={() => setShowReviewForm(false)}
            onSave={loadData}
          />
        )}

        {activeTab === "gallery" && (
          <GalleryTab gallery={gallery} onRefresh={loadData} />
        )}

        {activeTab === "settings" && (
          <SettingsTab mattresses={mattresses} />
        )}
      </div>
    </div>
  );
}

// ─── Вспомогательный компонент: редактор массива строк ───────────────────────
function ArrayEditor({ label, values, onChange, placeholder }) {
  const [inputVal, setInputVal] = useState("");

  const add = () => {
    const v = inputVal.trim();
    if (!v) return;
    onChange([...values, v]);
    setInputVal("");
  };

  const remove = (idx) => onChange(values.filter((_, i) => i !== idx));

  return (
    <div className={styles.formGroup}>
      <label>{label}</label>
      <div className={styles.arrayEditorList}>
        {values.map((v, i) => (
          <span key={i} className={styles.arrayTag}>
            {v}
            <button type="button" onClick={() => remove(i)} className={styles.arrayTagRemove}>
              ×
            </button>
          </span>
        ))}
      </div>
      <div className={styles.arrayEditorInput}>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
        />
        <button type="button" onClick={add} className={styles.arrayAddBtn}>
          + Добавить
        </button>
      </div>
    </div>
  );
}

// ─── Выбор типов тканей (упорядоченный) ─────────────────────────────────────
function ClothingTypeSelector({ allTypes, selectedIds, onChange }) {
  const selectedTypes = selectedIds
    .map((id) => allTypes.find((t) => t.id === id))
    .filter(Boolean);
  const availableTypes = allTypes.filter((t) => !selectedIds.includes(t.id));

  const addType = (id) => onChange([...selectedIds, Number(id)]);
  const removeType = (id) => onChange(selectedIds.filter((sid) => sid !== id));
  const moveUp = (idx) => {
    if (idx === 0) return;
    const next = [...selectedIds];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    onChange(next);
  };
  const moveDown = (idx) => {
    if (idx === selectedIds.length - 1) return;
    const next = [...selectedIds];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    onChange(next);
  };

  return (
    <div className={styles.formGroup}>
      <label>Типы тканей (порядок = индекс цены)</label>
      <div className={styles.ctSelector}>
        {selectedTypes.length > 0 ? (
          <div className={styles.ctSelectedList}>
            {selectedTypes.map((ct, idx) => (
              <div key={ct.id} className={styles.ctSelectedItem}>
                <span className={styles.ctOrder}>{idx + 1}</span>
                {ct.image && (
                  <img
                    src={`${config.API_URL}${ct.image}`}
                    alt={ct.name}
                    className={styles.ctThumb}
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                )}
                <span className={styles.ctName}>{ct.name}</span>
                <div className={styles.ctActions}>
                  <button type="button" onClick={() => moveUp(idx)} title="Вверх" className={styles.ctMoveBtn}>↑</button>
                  <button type="button" onClick={() => moveDown(idx)} title="Вниз" className={styles.ctMoveBtn}>↓</button>
                  <button type="button" onClick={() => removeType(ct.id)} className={styles.ctRemoveBtn}>×</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.noImagesText}>Типы тканей не выбраны</p>
        )}

        {availableTypes.length > 0 && (
          <div className={styles.ctAddRow}>
            <select
              defaultValue=""
              onChange={(e) => { if (e.target.value) { addType(e.target.value); e.target.value = ""; } }}
              className={styles.ctAddSelect}
            >
              <option value="">+ Добавить тип ткани...</option>
              {availableTypes.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
        )}
        <small>Порядок важен: соответствует индексам в массиве цен</small>
      </div>
    </div>
  );
}

// ─── Компании ─────────────────────────────────────────────────────────────────
function CompaniesTab({ companies, onEdit, onDelete, onAdd, showForm, onCloseForm, editingCompany, onSave }) {
  return (
    <div className={styles.tabContent}>
      <div className={styles.tabHeader}>
        <h2>Компании ({companies.length})</h2>
        <button onClick={onAdd} className={styles.addBtn}>+ Добавить</button>
      </div>

      {showForm && (
        <CompanyForm company={editingCompany} onClose={onCloseForm} onSave={onSave} />
      )}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Логотип</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id}>
                <td>{company.id}</td>
                <td>{company.name}</td>
                <td>
                  <img
                    src={company.logo ? `${config.API_URL}${company.logo}` : `${config.API_URL}/uploads/companylogo/${company.name.toLowerCase()}.jpg`}
                    alt={company.name}
                    className={styles.thumbnail}
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                </td>
                <td className={styles.actionCell}>
                  <div className={styles.actionCellInner}>
                    <button onClick={() => onEdit(company)} className={styles.editBtn}>Редактировать</button>
                    <button onClick={() => onDelete(company.id)} className={styles.deleteBtn}>Удалить</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CompanyForm({ company, onClose, onSave }) {
  const [name, setName] = useState(company?.name || "");
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLogo(file);
    const reader = new FileReader();
    reader.onloadend = () => setLogoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (logo) formData.append("logo", logo);

      if (company) {
        await axios.put(`${config.API_URL}/admin/companies/${company.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`${config.API_URL}/admin/companies`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      await onSave();
      onClose();
    } catch (error) {
      alert("Ошибка сохранения: " + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <h3>{company ? "Редактировать компанию" : "Добавить компанию"}</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Название</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label>Логотип</label>
          <input type="file" accept="image/*" onChange={handleLogoChange} />
          {(logoPreview || company?.logo) && (
            <img
              src={logoPreview || `${config.API_URL}${company.logo}`}
              alt="Preview"
              className={styles.preview}
              onError={(e) => { e.target.style.display = "none"; }}
            />
          )}
        </div>
        <div className={styles.formActions}>
          <button type="submit" disabled={loading}>{loading ? "Сохранение..." : "Сохранить"}</button>
          <button type="button" onClick={onClose}>Отмена</button>
        </div>
      </form>
    </Modal>
  );
}

// ─── Матрасы ──────────────────────────────────────────────────────────────────
function MattressesTab({ mattresses, companies, types, shapes, rigidities, clothingTypes, onEdit, onDelete, onAdd, showForm, onCloseForm, editingMattress, onSave }) {
  return (
    <div className={styles.tabContent}>
      <div className={styles.tabHeader}>
        <h2>Матрасы ({mattresses.length})</h2>
        <button onClick={onAdd} className={styles.addBtn}>+ Добавить</button>
      </div>

      {showForm && (
        <MattressForm
          mattress={editingMattress}
          companies={companies}
          types={types}
          shapes={shapes}
          rigidities={rigidities}
          clothingTypes={clothingTypes}
          onClose={onCloseForm}
          onSave={onSave}
        />
      )}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Превью</th>
              <th>Название</th>
              <th>Компания</th>
              <th>Тип</th>
              <th>Кол-во фото</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {mattresses.map((mattress) => (
              <tr key={mattress.id}>
                <td>{mattress.id}</td>
                <td>
                  <img
                    src={`${config.API_URL}/uploads/mattresses/${mattress.id}/1.jpg`}
                    alt={mattress.name}
                    className={styles.thumbnail}
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                </td>
                <td>{mattress.name}</td>
                <td>{mattress.Company?.name || "—"}</td>
                <td>{mattress.MattressType?.type_name || "—"}</td>
                <td>{mattress.pictures_count || 0} шт.</td>
                <td className={styles.actionCell}>
                  <div className={styles.actionCellInner}>
                    <button onClick={() => onEdit(mattress)} className={styles.editBtn}>Редактировать</button>
                    <button onClick={() => onDelete(mattress.id)} className={styles.deleteBtn}>Удалить</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MattressForm({ mattress, companies, types, shapes, rigidities, clothingTypes: allClothingTypes, onClose, onSave }) {
  // Определяем начальный порядок выбранных типов тканей из связи
  const initialSelectedClothing = mattress?.ClothingTypes
    ? [...mattress.ClothingTypes]
        .sort((a, b) => (a.MattressClothingType?.order ?? 0) - (b.MattressClothingType?.order ?? 0))
        .map((ct) => ct.id)
    : [];

  const [formData, setFormData] = useState({
    name: mattress?.name || "",
    company_id: mattress?.company_id || "",
    mattress_type_id: mattress?.mattress_type_id || "",
    mattress_shape_id: mattress?.mattress_shape_id || "",
    description: mattress?.description || "",
    width: mattress?.width || "",
    length: mattress?.length || "",
    thickness: mattress?.thickness || "",
    max_weight: mattress?.max_weight || "",
    rigidity_ids: mattress?.MattressRigidities ? mattress.MattressRigidities.map((r) => r.id) : [],
  });
  const [prices, setPrices] = useState(mattress?.price || []);
  const [materials, setMaterials] = useState(mattress?.material || []);
  const [selectedClothingIds, setSelectedClothingIds] = useState(initialSelectedClothing);
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mattress?.id) {
      axios.get(`${config.API_URL}/admin/mattresses/${mattress.id}/images`)
        .then((res) => setExistingImages(res.data))
        .catch(() => {});
    }
  }, [mattress?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRigidityChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (o) => parseInt(o.value));
    setFormData((prev) => ({ ...prev, rigidity_ids: selected }));
  };

  const handleDeleteExistingImage = async (filename) => {
    if (!confirm("Удалить фото?")) return;
    try {
      await axios.delete(`${config.API_URL}/admin/mattresses/${mattress.id}/images/${filename}`);
      setExistingImages((prev) => prev.filter((img) => img.filename !== filename));
    } catch {
      alert("Ошибка удаления фото");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const submitData = {
        ...formData,
        price: JSON.stringify(prices),
        material: JSON.stringify(materials),
        clothing_type_ids: JSON.stringify(selectedClothingIds),
        rigidity_ids: JSON.stringify(formData.rigidity_ids),
      };

      let savedMattress = mattress;
      if (mattress) {
        await axios.put(`${config.API_URL}/admin/mattresses/${mattress.id}`, submitData);
      } else {
        const res = await axios.post(`${config.API_URL}/admin/mattresses`, submitData);
        savedMattress = res.data;
      }

      // Загружаем новые изображения
      if (images.length > 0 && savedMattress?.id) {
        setUploadingImages(true);
        const imgForm = new FormData();
        images.forEach((f) => imgForm.append("images", f));
        await axios.post(`${config.API_URL}/admin/mattresses/${savedMattress.id}/images`, imgForm, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      await onSave();
      onClose();
    } catch (error) {
      alert("Ошибка сохранения: " + (error.response?.data?.error || error.message));
      console.error(error);
    } finally {
      setLoading(false);
      setUploadingImages(false);
    }
  };

  return (
    <Modal onClose={onClose} wide>
      <h3>{mattress ? "Редактировать матрас" : "Добавить матрас"}</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Название</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Компания</label>
            <select name="company_id" value={formData.company_id} onChange={handleChange} required>
              <option value="">Выберите компанию</option>
              {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Тип</label>
            <select name="mattress_type_id" value={formData.mattress_type_id} onChange={handleChange}>
              <option value="">Не указан</option>
              {types.map((t) => <option key={t.id} value={t.id}>{t.type_name}</option>)}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Форма</label>
            <select name="mattress_shape_id" value={formData.mattress_shape_id} onChange={handleChange}>
              <option value="">Не указана</option>
              {shapes.map((s) => <option key={s.id} value={s.id}>{s.shape_name}</option>)}
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Жёсткости</label>
          <select
            name="rigidity_ids"
            value={formData.rigidity_ids.map(String)}
            onChange={handleRigidityChange}
            multiple
            className={styles.multiSelect}
          >
            {rigidities.map((r) => <option key={r.id} value={r.id}>{r.rigidity_name}</option>)}
          </select>
          <small>Удерживайте Ctrl/Cmd для выбора нескольких</small>
        </div>

        <div className={styles.formGroup}>
          <label>Описание</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={4} />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Ширина</label>
            <input type="text" name="width" value={formData.width} onChange={handleChange} placeholder="напр. 80 см" />
          </div>
          <div className={styles.formGroup}>
            <label>Длина</label>
            <input type="text" name="length" value={formData.length} onChange={handleChange} placeholder="напр. 200 см" />
          </div>
          <div className={styles.formGroup}>
            <label>Толщина</label>
            <input type="text" name="thickness" value={formData.thickness} onChange={handleChange} placeholder="напр. 12 см" />
          </div>
          <div className={styles.formGroup}>
            <label>Макс. вес (кг)</label>
            <input type="number" name="max_weight" value={formData.max_weight} onChange={handleChange} />
          </div>
        </div>

        <ArrayEditor
          label="Цены"
          values={prices}
          onChange={setPrices}
          placeholder="напр. 14 500 ₽"
        />

        <ArrayEditor
          label="Материалы"
          values={materials}
          onChange={setMaterials}
          placeholder="напр. Пенополиуретан"
        />

        <ClothingTypeSelector
          allTypes={allClothingTypes}
          selectedIds={selectedClothingIds}
          onChange={setSelectedClothingIds}
        />

        {/* Существующие фотографии */}
        {mattress?.id && (
          <div className={styles.formGroup}>
            <label>Фотографии матраса</label>
            {existingImages.length > 0 ? (
              <div className={styles.imageGrid}>
                {existingImages.map((img) => (
                  <div key={img.filename} className={styles.imageItem}>
                    <img src={`${config.API_URL}${img.path}`} alt={img.filename} />
                    <button
                      type="button"
                      onClick={() => handleDeleteExistingImage(img.filename)}
                      className={styles.imageDeleteBtn}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.noImagesText}>Фото не добавлены</p>
            )}
          </div>
        )}

        {/* Загрузка новых фото */}
        <div className={styles.formGroup}>
          <label>{mattress?.id ? "Добавить новые фото" : "Фото (можно добавить после сохранения)"}</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files))}
            disabled={!mattress?.id}
          />
          {images.length > 0 && (
            <div className={styles.imageGrid}>
              {images.map((f, i) => (
                <div key={i} className={styles.imageItem}>
                  <img src={URL.createObjectURL(f)} alt={f.name} />
                </div>
              ))}
            </div>
          )}
          {!mattress?.id && (
            <small>Сохраните матрас, чтобы добавить фотографии</small>
          )}
        </div>

        <div className={styles.formActions}>
          <button type="submit" disabled={loading || uploadingImages}>
            {uploadingImages ? "Загружаем фото..." : loading ? "Сохранение..." : "Сохранить"}
          </button>
          <button type="button" onClick={onClose}>Отмена</button>
        </div>
      </form>
    </Modal>
  );
}

// ─── Отзывы ───────────────────────────────────────────────────────────────────
function ReviewsTab({ reviews, onDelete, onAdd, showForm, onCloseForm, onSave }) {
  return (
    <div className={styles.tabContent}>
      <div className={styles.tabHeader}>
        <h2>Отзывы ({reviews.length})</h2>
        <button onClick={onAdd} className={styles.addBtn}>+ Добавить</button>
      </div>

      {showForm && <ReviewForm onClose={onCloseForm} onSave={onSave} />}

      <div className={styles.reviewsGrid}>
        {reviews.map((review) => (
          <div key={review.id} className={styles.reviewCard}>
            <img src={`${config.API_URL}${review.path}`} alt={review.filename} className={styles.reviewImage} />
            <div className={styles.reviewActions}>
              <button onClick={() => onDelete(review.filename)} className={styles.deleteBtn}>Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewForm({ onClose, onSave }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Выберите изображение");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("review_image", image);
      await axios.post(`${config.API_URL}/admin/reviews`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await onSave();
      onClose();
    } catch {
      alert("Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <h3>Добавить отзыв</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Изображение</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
          {image && <img src={URL.createObjectURL(image)} alt="Preview" className={styles.preview} />}
        </div>
        <div className={styles.formActions}>
          <button type="submit" disabled={loading}>{loading ? "Загрузка..." : "Загрузить"}</button>
          <button type="button" onClick={onClose}>Отмена</button>
        </div>
      </form>
    </Modal>
  );
}

// ─── Галерея ──────────────────────────────────────────────────────────────────
function GalleryTab({ gallery, onRefresh }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("gallery_image", file);
        await axios.post(`${config.API_URL}/admin/gallery`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      await onRefresh();
    } catch {
      alert("Ошибка загрузки");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (filename) => {
    if (!confirm("Удалить фото из галереи?")) return;
    try {
      await axios.delete(`${config.API_URL}/admin/gallery/${filename}`);
      await onRefresh();
    } catch {
      alert("Ошибка удаления");
    }
  };

  return (
    <div className={styles.tabContent}>
      <div className={styles.tabHeader}>
        <h2>Галерея ({gallery.length} фото)</h2>
        <div className={styles.uploadArea}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            style={{ display: "none" }}
            id="galleryUpload"
          />
          <label htmlFor="galleryUpload" className={`${styles.addBtn} ${uploading ? styles.disabled : ""}`}>
            {uploading ? "Загрузка..." : "+ Загрузить фото"}
          </label>
        </div>
      </div>

      <div className={styles.galleryAdminGrid}>
        {gallery.map((item) => (
          <div key={item.filename} className={styles.galleryAdminItem}>
            <img src={`${config.API_URL}${item.path}`} alt={item.filename} loading="lazy" />
            <div className={styles.galleryAdminOverlay}>
              <span className={styles.galleryAdminFilename}>{item.filename}</span>
              <button
                onClick={() => handleDelete(item.filename)}
                className={styles.galleryDeleteBtn}
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>

      {gallery.length === 0 && (
        <p className={styles.emptyText}>Галерея пуста. Загрузите фотографии.</p>
      )}
    </div>
  );
}

// ─── Настройки ────────────────────────────────────────────────────────────────
function SettingsTab({ mattresses }) {
  const [bestsellers, setBestsellers] = useState([
    { mattressId: "", price: "" },
    { mattressId: "", price: "" },
    { mattressId: "", price: "" },
  ]);
  const [heroFile, setHeroFile] = useState(null);
  const [heroPreview, setHeroPreview] = useState(null);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);

  useEffect(() => {
    axios.get(`${config.API_URL}/admin/settings`)
      .then((res) => {
        if (res.data.bestsellers && res.data.bestsellers.length > 0) {
          const filled = res.data.bestsellers.map((b) => ({
            mattressId: b.mattressId || "",
            price: b.price || "",
          }));
          while (filled.length < 3) filled.push({ mattressId: "", price: "" });
          setBestsellers(filled.slice(0, 3));
        }
      })
      .catch(() => {})
      .finally(() => setLoadingSettings(false));
  }, []);

  const handleBestsellerChange = (idx, field, value) => {
    setBestsellers((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  };

  const handleSaveSettings = async () => {
    setSavingSettings(true);
    try {
      const validBestsellers = bestsellers.filter((b) => b.mattressId);
      await axios.put(`${config.API_URL}/admin/settings`, { bestsellers: validBestsellers });
      alert("Настройки сохранены!");
    } catch {
      alert("Ошибка сохранения настроек");
    } finally {
      setSavingSettings(false);
    }
  };

  const handleHeroChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setHeroFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setHeroPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleHeroUpload = async () => {
    if (!heroFile) return;
    setUploadingHero(true);
    try {
      const formData = new FormData();
      formData.append("hero_image", heroFile);
      await axios.post(`${config.API_URL}/admin/hero-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Главное изображение обновлено!");
      setHeroFile(null);
      setHeroPreview(null);
    } catch {
      alert("Ошибка загрузки изображения");
    } finally {
      setUploadingHero(false);
    }
  };

  if (loadingSettings) return <div className={styles.loadingBar}>Загрузка настроек...</div>;

  return (
    <div className={styles.tabContent}>
      <h2>Настройки сайта</h2>

      {/* Hero-изображение */}
      <div className={styles.settingsSection}>
        <h3 className={styles.settingsSectionTitle}>Главное изображение (баннер)</h3>
        <div className={styles.heroUploadRow}>
          <div className={styles.heroCurrentWrap}>
            <p className={styles.settingsLabel}>Текущее:</p>
            <img
              src={`${config.API_URL}/uploads/main_image.jpg?t=${Date.now()}`}
              alt="Текущий баннер"
              className={styles.heroThumb}
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </div>
          <div className={styles.heroUploadControls}>
            <p className={styles.settingsLabel}>Новое изображение:</p>
            <input type="file" accept="image/*" onChange={handleHeroChange} />
            {heroPreview && (
              <img src={heroPreview} alt="Preview" className={styles.heroThumb} />
            )}
            <button
              onClick={handleHeroUpload}
              disabled={!heroFile || uploadingHero}
              className={styles.saveBtn}
            >
              {uploadingHero ? "Загрузка..." : "Загрузить баннер"}
            </button>
          </div>
        </div>
      </div>

      {/* Хиты продаж */}
      <div className={styles.settingsSection}>
        <h3 className={styles.settingsSectionTitle}>Хиты продаж (главная страница)</h3>
        <p className={styles.settingsHint}>Выберите до 3 матрасов для отображения в разделе «Хиты продаж»</p>
        {bestsellers.map((b, idx) => (
          <div key={idx} className={styles.bestsellerRow}>
            <span className={styles.bestsellerNum}>{idx + 1}.</span>
            <div className={styles.formGroup} style={{ flex: 2, margin: 0 }}>
              <select
                value={b.mattressId}
                onChange={(e) => handleBestsellerChange(idx, "mattressId", e.target.value)}
              >
                <option value="">— Не выбран —</option>
                {mattresses.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.Company?.name ? `[${m.Company.name}] ` : ""}{m.name} (ID: {m.id})
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup} style={{ flex: 1, margin: 0 }}>
              <input
                type="text"
                placeholder="Цена, напр. 14 500 ₽"
                value={b.price}
                onChange={(e) => handleBestsellerChange(idx, "price", e.target.value)}
              />
            </div>
            {b.mattressId && (
              <img
                src={`${config.API_URL}/uploads/mattresses/${b.mattressId}/1.jpg`}
                alt="preview"
                className={styles.bestsellerThumb}
                onError={(e) => { e.target.style.display = "none"; }}
              />
            )}
          </div>
        ))}
        <button
          onClick={handleSaveSettings}
          disabled={savingSettings}
          className={styles.saveBtn}
        >
          {savingSettings ? "Сохранение..." : "Сохранить настройки"}
        </button>
      </div>
    </div>
  );
}

// ─── Типы тканей ──────────────────────────────────────────────────────────────
function ClothingTypesTab({ clothingTypes, onRefresh }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleDelete = async (id) => {
    if (!confirm("Удалить тип ткани?")) return;
    try {
      await axios.delete(`${config.API_URL}/admin/clothing-types/${id}`);
      onRefresh();
    } catch { alert("Ошибка удаления"); }
  };

  return (
    <div className={styles.tabContent}>
      <div className={styles.tabHeader}>
        <h2>Типы тканей ({clothingTypes.length})</h2>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className={styles.addBtn}>
          + Добавить
        </button>
      </div>

      {showForm && (
        <ClothingTypeForm
          ct={editing}
          onClose={() => setShowForm(false)}
          onSave={async () => { await onRefresh(); setShowForm(false); }}
        />
      )}

      <div className={styles.ctGrid}>
        {clothingTypes.map((ct) => (
          <div key={ct.id} className={styles.ctCard}>
            <div className={styles.ctCardImage}>
              {ct.image ? (
                <img src={`${config.API_URL}${ct.image}`} alt={ct.name} />
              ) : (
                <div className={styles.ctNoImage}>Нет фото</div>
              )}
            </div>
            <div className={styles.ctCardBody}>
              <p className={styles.ctCardName}>{ct.name}</p>
              {ct.description && <p className={styles.ctCardDesc}>{ct.description}</p>}
              <div className={styles.actionCellInner} style={{ marginTop: "0.5rem" }}>
                <button onClick={() => { setEditing(ct); setShowForm(true); }} className={styles.editBtn}>
                  Изменить
                </button>
                <button onClick={() => handleDelete(ct.id)} className={styles.deleteBtn}>
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
        {clothingTypes.length === 0 && (
          <p className={styles.emptyText}>Типы тканей не добавлены</p>
        )}
      </div>
    </div>
  );
}

function ClothingTypeForm({ ct, onClose, onSave }) {
  const [name, setName] = useState(ct?.name || "");
  const [description, setDescription] = useState(ct?.description || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Введите название");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (image) formData.append("clothing_type_image", image);

      if (ct) {
        await axios.put(`${config.API_URL}/admin/clothing-types/${ct.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`${config.API_URL}/admin/clothing-types`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      await onSave();
    } catch (err) {
      alert("Ошибка сохранения: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <h3>{ct ? "Редактировать тип ткани" : "Добавить тип ткани"}</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Название</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="напр. Жаккард" />
        </div>
        <div className={styles.formGroup}>
          <label>Описание (отображается при наведении)</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
            placeholder="напр. Прочная ткань с выразительным рисунком. Износостойкая, легко чистится." />
        </div>
        <div className={styles.formGroup}>
          <label>Фото ткани (для предпросмотра)</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {(preview || ct?.image) && (
            <img
              src={preview || `${config.API_URL}${ct.image}`}
              alt="preview"
              className={styles.preview}
              onError={(e) => { e.target.style.display = "none"; }}
            />
          )}
        </div>
        <div className={styles.formActions}>
          <button type="submit" disabled={loading}>{loading ? "Сохранение..." : "Сохранить"}</button>
          <button type="button" onClick={onClose}>Отмена</button>
        </div>
      </form>
    </Modal>
  );
}

// ─── Обёртка модального окна ──────────────────────────────────────────────────
function Modal({ children, onClose, wide }) {
  return (
    <div className={styles.modal} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`${styles.modalContent} ${wide ? styles.modalWide : ""}`}>
        <button className={styles.modalClose} onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}
