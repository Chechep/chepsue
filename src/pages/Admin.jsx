import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Edit,
  Plus,
  Save,
  ShieldCheck,
  Trash2,
  X,
  Search,
  Package,
  Users,
  ShoppingBag,
  LayoutDashboard,
  User,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import productsData from "../data/product";
import { useAuth } from "../context/AuthContext";

const PRODUCTS_KEY = "chepsueProducts";
const HISTORY_KEY = "chepsueOrderHistory";

export default function Admin() {
  const navigate = useNavigate();
  const { user, loading, isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [orderSearch, setOrderSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const emptyProduct = { id: "", name: "", description: "", category: "", price: "", image: "" };
  const [formData, setFormData] = useState(emptyProduct);

  useEffect(() => {
    if (!loading && (!user || !isAdmin())) navigate("/");
  }, [user, loading, isAdmin, navigate]);

  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem(PRODUCTS_KEY);
      const savedOrders = localStorage.getItem(HISTORY_KEY);
      setProducts(savedProducts ? JSON.parse(savedProducts) : productsData);
      setOrders(savedOrders ? JSON.parse(savedOrders) : []);
    } catch {
      setProducts(productsData);
      setOrders([]);
    }
  }, []);

  const saveProducts = (items) => {
    setProducts(items);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(items));
  };

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const openAddForm = () => {
    setEditingId(null);
    setFormData({ ...emptyProduct, id: `product-${Date.now()}` });
    setShowForm(true);
    setActiveTab("products");
  };

  const openEditForm = (product) => {
    setEditingId(product.id);
    setFormData({ ...product, price: product.price || "" });
    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyProduct);
  };

  const saveProduct = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.category || !formData.image) {
      alert("Please complete all required product fields.");
      return;
    }

    const product = { ...formData, price: formData.price ? Number(formData.price) : null };

    if (editingId) {
      saveProducts(products.map((item) => item.id === editingId ? product : item));
    } else {
      saveProducts([product, ...products]);
    }

    cancelForm();
  };

  const deleteProduct = (id) => {
    const product = products.find((item) => item.id === id);
    if (!product) return;

    if (!window.confirm(`Delete "${product.name}"?`)) return;

    saveProducts(products.filter((item) => item.id !== id));
  };

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(search.toLowerCase())
  );

  const filteredOrders = orders.filter((order) =>
    `${order.id} ${order.customer?.name} ${order.customer?.email} ${order.customer?.phone}`.toLowerCase().includes(orderSearch.toLowerCase())
  );

  const stats = [
    { label: "Products", value: products.length, icon: Package },
    { label: "Orders", value: orders.length, icon: ShoppingBag },
    { label: "Users", value: "—", icon: Users },
  ];

  if (loading || !user || !isAdmin()) {
    return (
      <main className="min-h-screen bg-white pt-32 flex items-center justify-center">
        <p className="text-gray-500">Checking administrator access...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-28 pb-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <Link to="/profile" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition">
              <ArrowLeft size={16} />
              Back to Profile
            </Link>

            <div className="flex items-center gap-3 mt-6">
              <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center">
                <ShieldCheck size={23} className="text-green" />
              </div>

              <div>
                <p className="text-sm text-green font-semibold">Administrator</p>
                <h1 className="text-4xl md:text-5xl font-semibold text-black" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Admin Dashboard
                </h1>
              </div>
            </div>
          </div>

          {activeTab === "products" && (
            <button onClick={openAddForm} className="bg-black text-white px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-green transition">
              <Plus size={19} />
              Add Product
            </button>
          )}
        </div>

        {/* NAVIGATION */}
        <div className="flex gap-2 overflow-x-auto border-b border-black/10 mt-10 pb-2">
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "products", label: "Products", icon: Package },
            { id: "users", label: "Users", icon: Users },
            { id: "orders", label: "Orders", icon: ShoppingBag },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition ${activeTab === id ? "bg-black text-white" : "text-gray-500 hover:bg-gray-100 hover:text-black"}`}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
        </div>

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <section className="mt-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {stats.map(({ label, value, icon: Icon }) => (
                <div key={label} className="border border-black/10 rounded-[24px] p-6 bg-white">
                  <div className="w-11 h-11 rounded-xl bg-black flex items-center justify-center">
                    <Icon size={20} className="text-green" />
                  </div>

                  <p className="text-gray-500 text-sm mt-5">{label}</p>
                  <p className="text-4xl font-bold mt-1">{value}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mt-8">
              <div className="border border-black/10 rounded-[24px] p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Recent Orders
                  </h2>

                  <button onClick={() => setActiveTab("orders")} className="text-sm font-semibold hover:text-green">
                    View All
                  </button>
                </div>

                {orders.length === 0 ? (
                  <p className="text-gray-500 mt-6">No orders yet.</p>
                ) : (
                  <div className="space-y-3 mt-6">
                    {orders.slice(0, 5).map((order) => (
                      <button key={order.id} onClick={() => { setSelectedOrder(order); setActiveTab("orders"); }} className="w-full flex items-center justify-between gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 text-left transition">
                        <div>
                          <p className="font-semibold">{order.customer?.name || "Customer"}</p>
                          <p className="text-xs text-gray-500 mt-1">{order.id}</p>
                        </div>

                        <span className="text-xs bg-green/10 text-green px-3 py-1 rounded-full font-semibold">
                          {order.status || "Received"}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="border border-black/10 rounded-[24px] p-6">
                <h2 className="text-2xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Administrator
                </h2>

                <div className="flex items-center gap-4 mt-6">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || "Admin"} className="w-16 h-16 rounded-full object-cover" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
                      <User className="text-green" />
                    </div>
                  )}

                  <div>
                    <p className="font-bold">{user.displayName || "Administrator"}</p>
                    <p className="text-sm text-gray-500 mt-1">{user.email}</p>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-green/5 border border-green/10">
                  <div className="flex items-center gap-2 text-green font-semibold">
                    <CheckCircle2 size={17} />
                    Administrator Access
                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    You currently have permission to manage the store.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* PRODUCTS */}
        {activeTab === "products" && (
          <section className="mt-10">
            {showForm && (
              <div className="mb-10 bg-gray-50 border border-black/10 rounded-[28px] p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {editingId ? "Edit Product" : "Add Product"}
                  </h2>

                  <button onClick={cancelForm} className="p-2 rounded-lg hover:bg-black/5">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={saveProduct} className="grid md:grid-cols-2 gap-5 mt-7">
                  <input name="name" value={formData.name} onChange={handleChange} placeholder="Product Name *" required className="px-4 py-3.5 rounded-xl border border-black/10 outline-none focus:border-black" />
                  <input name="category" value={formData.category} onChange={handleChange} placeholder="Category *" required className="px-4 py-3.5 rounded-xl border border-black/10 outline-none focus:border-black" />
                  <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" min="0" className="px-4 py-3.5 rounded-xl border border-black/10 outline-none focus:border-black" />
                  <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL *" required className="px-4 py-3.5 rounded-xl border border-black/10 outline-none focus:border-black" />
                  <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Product Description *" required rows="4" className="md:col-span-2 px-4 py-3.5 rounded-xl border border-black/10 outline-none focus:border-black resize-none" />

                  <div className="md:col-span-2 flex flex-col sm:flex-row gap-3">
                    <button type="submit" className="bg-black text-white px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-green transition">
                      <Save size={18} />
                      {editingId ? "Save Changes" : "Create Product"}
                    </button>

                    <button type="button" onClick={cancelForm} className="border border-black/10 px-6 py-3.5 rounded-xl font-semibold hover:bg-white transition">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Products</h2>
                <p className="text-gray-500 text-sm mt-1">{products.length} products in your collection</p>
              </div>

              <div className="relative w-full md:w-80">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="w-full pl-11 pr-4 py-3 rounded-xl border border-black/10 outline-none focus:border-black" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <article key={product.id} className="border border-black/10 rounded-[24px] overflow-hidden bg-white">
                  <div className="h-56 bg-gray-100">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="p-5">
                    <p className="text-xs text-green font-semibold uppercase tracking-wider">{product.category}</p>
                    <h3 className="text-xl font-bold mt-2">{product.name}</h3>
                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">{product.description}</p>

                    {product.price && <p className="font-bold mt-4">KSh {Number(product.price).toLocaleString()}</p>}

                    <div className="grid grid-cols-2 gap-3 mt-5">
                      <button onClick={() => openEditForm(product)} className="border border-black/10 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-black hover:text-white transition">
                        <Edit size={16} />
                        Edit
                      </button>

                      <button onClick={() => deleteProduct(product.id)} className="border border-red-100 text-red-500 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-red-500 hover:text-white transition">
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {!filteredProducts.length && (
              <div className="text-center py-20">
                <Package size={40} className="mx-auto text-gray-300" />
                <p className="text-gray-500 mt-4">No products found.</p>
              </div>
            )}
          </section>
        )}

        {/* USERS */}
        {activeTab === "users" && (
          <section className="mt-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Users</h2>
                <p className="text-gray-500 text-sm mt-1">Manage registered Chepsue Arts accounts.</p>
              </div>

              <div className="relative w-full md:w-80">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input placeholder="Search users..." className="w-full pl-11 pr-4 py-3 rounded-xl border border-black/10 outline-none focus:border-black" />
              </div>
            </div>

            <div className="mt-6 border border-black/10 rounded-[24px] overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || "Admin"} className="w-14 h-14 rounded-full object-cover" />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center">
                      <User size={22} className="text-green" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold">{user.displayName || "Administrator"}</h3>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  </div>

                  <span className="hidden sm:block bg-green/10 text-green px-3 py-1.5 rounded-full text-xs font-bold">
                    ADMIN
                  </span>
                </div>

                <div className="mt-6 p-6 border border-dashed border-black/10 rounded-2xl text-center">
                  <Users size={35} className="mx-auto text-gray-300" />
                  <h3 className="font-semibold mt-4">User management is ready for Firestore</h3>
                  <p className="text-sm text-gray-500 max-w-lg mx-auto mt-2">
                    Once Firestore and the Firebase Admin SDK are connected, this section can display every registered user and allow you to manage accounts securely.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ORDERS */}
        {activeTab === "orders" && (
          <section className="mt-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Orders</h2>
                <p className="text-gray-500 text-sm mt-1">{orders.length} orders received</p>
              </div>

              <div className="relative w-full md:w-80">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={orderSearch} onChange={(e) => setOrderSearch(e.target.value)} placeholder="Search orders..." className="w-full pl-11 pr-4 py-3 rounded-xl border border-black/10 outline-none focus:border-black" />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="border border-black/10 rounded-[24px] p-5 md:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center">
                        <ShoppingBag size={20} className="text-green" />
                      </div>

                      <div>
                        <h3 className="font-bold">{order.customer?.name || "Customer"}</h3>
                        <p className="text-sm text-gray-500">{order.id}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <span className="flex items-center gap-2 text-gray-500">
                        <Calendar size={16} />
                        {order.date}
                      </span>

                      <span className="flex items-center gap-2 text-green font-semibold">
                        <Clock size={16} />
                        {order.status || "Received"}
                      </span>

                      <button onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)} className="border border-black/10 px-4 py-2 rounded-xl flex items-center gap-2 font-semibold hover:bg-black hover:text-white transition">
                        <Eye size={16} />
                        View
                      </button>
                    </div>
                  </div>

                  {selectedOrder?.id === order.id && (
                    <div className="mt-6 pt-6 border-t border-black/10 grid lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold">Customer Details</h4>

                        <div className="space-y-3 mt-4 text-sm text-gray-600">
                          <p className="flex items-center gap-2">
                            <User size={16} />
                            {order.customer?.name}
                          </p>

                          <p className="flex items-center gap-2">
                            <Mail size={16} />
                            {order.customer?.email || "No email"}
                          </p>

                          <p>{order.customer?.phone}</p>
                          <p>{order.customer?.location}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold">Order Items</h4>

                        <div className="space-y-3 mt-4">
                          {order.items?.map((item) => (
                            <div key={item.id} className="flex justify-between gap-4 bg-gray-50 rounded-xl p-4">
                              <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Quantity: {item.quantity} {item.size && `• Size: ${item.size}`} {item.color && `• ${item.color}`}
                                </p>
                              </div>

                              <p className="font-semibold whitespace-nowrap">
                                {item.price ? `KSh ${Number(item.price).toLocaleString()}` : "To confirm"}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-black/10 mt-4 pt-4 flex justify-between font-bold">
                          <span>Total</span>
                          <span>{order.totalPrice ? `KSh ${Number(order.totalPrice).toLocaleString()}` : "To confirm"}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {!filteredOrders.length && (
                <div className="text-center py-20 border border-black/10 rounded-[24px]">
                  <ShoppingBag size={40} className="mx-auto text-gray-300" />
                  <p className="text-gray-500 mt-4">No orders found.</p>
                </div>
              )}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}