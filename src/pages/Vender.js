// src/pages/Vender.js
import './Vender.css';
import { FormattedMessage } from 'react-intl';
import "../localizacion/EN.json";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HU11 from '../components/HU11';
import HU12 from '../components/HU12';
import authService from '../services/authService';
import standsService from '../services/StandsService';
import productosService from '../services/productosService';

function Vender() {
    const navigate = useNavigate();
    
    // Estados para la autenticación y datos del usuario
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userStand, setUserStand] = useState(null);
    const [userProducts, setUserProducts] = useState([]);
    
    // Estados para los componentes mostrados
    const [mostrarHU11, setMostrarHU11] = useState(false);
    const [mostrarHU12, setMostrarHU12] = useState(false);
    const [mostrarProductosVendidos, setMostrarProductosVendidos] = useState(false);
    
    // Estados para errores
    const [error, setError] = useState('');
    
    // Estados para manejo de productos
    const [editingProduct, setEditingProduct] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [editForm, setEditForm] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        imagenUrl: ''
    });

    // Verificar autenticación al cargar el componente
    useEffect(() => {
        checkAuthentication();
    }, []);

    // Función para verificar si el usuario está autenticado
    const checkAuthentication = async () => {
        try {
            setLoading(true);
            
            // Verificar si hay token y si es válido
            if (!authService.isAuthenticated()) {
                navigate('/login');
                return;
            }

            // Verificar token en el servidor
            const isValid = await authService.verifyToken();
            if (!isValid) {
                authService.logout();
                navigate('/login');
                return;
            }

            // Obtener datos del usuario
            const currentUser = authService.getCurrentUser();
            setUser(currentUser);

            // Obtener el stand del usuario si tiene uno
            await loadUserStand();
            
        } catch (error) {
            console.error('Error verificando autenticación:', error);
            authService.logout();
            navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    // Función para cargar el stand del usuario
    const loadUserStand = async () => {
        try {
            const standResponse = await standsService.getMyStand();
            if (standResponse.success && standResponse.stand) {
                setUserStand(standResponse.stand);
                // Si tiene stand, cargar sus productos
                await loadUserProducts();
            }
        } catch (error) {
            // Si no tiene stand, es normal, no es un error
            if (error.status !== 404) {
                console.error('Error cargando stand del usuario:', error);
                setError('Error cargando información del stand');
            }
        }
    };

    // Función para cargar los productos del usuario
    const loadUserProducts = async () => {
        try {
            const productsResponse = await productosService.getMyProducts();
            if (productsResponse.success) {
                setUserProducts(productsResponse.products || []);
            }
        } catch (error) {
            console.error('Error cargando productos del usuario:', error);
            setError('Error cargando productos');
        }
    };

    // Función para manejar logout
    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    // Función para refrescar datos después de cambios
    const refreshData = async () => {
        await loadUserStand();
    };

    // Funciones para manejo de productos
    const startEditProduct = (product) => {
        setEditingProduct(product.id);
        setEditForm({
            nombre: product.nombre,
            descripcion: product.descripcion || '',
            precio: product.precio,
            imagenUrl: product.imagenUrl || ''
        });
        setError('');
    };

    const cancelEditProduct = () => {
        setEditingProduct(null);
        setEditForm({
            nombre: '',
            descripcion: '',
            precio: '',
            imagenUrl: ''
        });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const saveProduct = async (productId) => {
        try {
            if (!editForm.nombre || !editForm.precio) {
                setError('Nombre y precio son requeridos');
                return;
            }

            setLoading(true);
            const response = await productosService.updateProduct(productId, editForm);
            
            if (response) {
                // Actualizar la lista local
                setUserProducts(prev => prev.map(p => 
                    p.id === productId ? { ...p, ...editForm } : p
                ));
                
                // Cancelar edición
                cancelEditProduct();
                setError('');
            }
        } catch (error) {
            console.error('Error actualizando producto:', error);
            setError('Error actualizando el producto');
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            setLoading(true);
            await productosService.deleteProduct(productId);
            
            // Remover de la lista local
            setUserProducts(prev => prev.filter(p => p.id !== productId));
            
            setShowDeleteConfirm(null);
            setError('');
        } catch (error) {
            console.error('Error eliminando producto:', error);
            setError('Error eliminando el producto');
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price) => {
        if (!price) return 'Precio no definido';
        return price.toString().includes('cop') ? price : `${price} COP`;
    };

    // Componente ProductCard integrado
    const ProductCard = ({ product, onUpdate, loading: globalLoading }) => {
        return (
            <div className="product-card">
                {/* Imagen del producto */}
                <div className="product-image">
                    {product.imagenUrl ? (
                        <img src={product.imagenUrl} alt={product.nombre} />
                    ) : (
                        <div className="no-image">
                            <FormattedMessage 
                                id="productos.sin.imagen" 
                                defaultMessage="Sin imagen" 
                            />
                        </div>
                    )}
                </div>

                {/* Información del producto */}
                <div className="product-info">
                    {editingProduct === product.id ? (
                        // Formulario de edición
                        <div className="edit-form">
                            <input
                                type="text"
                                name="nombre"
                                value={editForm.nombre}
                                onChange={handleEditInputChange}
                                placeholder="Nombre del producto"
                                className="edit-input"
                            />
                            <textarea
                                name="descripcion"
                                value={editForm.descripcion}
                                onChange={handleEditInputChange}
                                placeholder="Descripción del producto"
                                className="edit-textarea"
                                rows="3"
                            />
                            <input
                                type="text"
                                name="precio"
                                value={editForm.precio}
                                onChange={handleEditInputChange}
                                placeholder="Precio (ej: 15.000 COP)"
                                className="edit-input"
                            />
                            <input
                                type="url"
                                name="imagenUrl"
                                value={editForm.imagenUrl}
                                onChange={handleEditInputChange}
                                placeholder="URL de la imagen"
                                className="edit-input"
                            />
                            
                            <div className="edit-actions">
                                <button 
                                    onClick={() => saveProduct(product.id)}
                                    className="btn-save"
                                    disabled={globalLoading}
                                >
                                    <FormattedMessage 
                                        id="productos.guardar" 
                                        defaultMessage="Guardar" 
                                    />
                                </button>
                                <button 
                                    onClick={cancelEditProduct}
                                    className="btn-cancel"
                                    disabled={globalLoading}
                                >
                                    <FormattedMessage 
                                        id="productos.cancelar" 
                                        defaultMessage="Cancelar" 
                                    />
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Vista normal del producto
                        <>
                            <h3 className="product-name">{product.nombre}</h3>
                            <p className="product-description">
                                {product.descripcion || 'Sin descripción'}
                            </p>
                            <p className="product-price">{formatPrice(product.precio)}</p>
                            
                            <div className="product-actions">
                                <button 
                                    onClick={() => startEditProduct(product)}
                                    className="btn-edit"
                                    disabled={globalLoading}
                                >
                                    <FormattedMessage 
                                        id="productos.editar" 
                                        defaultMessage="Editar" 
                                    />
                                </button>
                                <button 
                                    onClick={() => setShowDeleteConfirm(product.id)}
                                    className="btn-delete"
                                    disabled={globalLoading}
                                >
                                    <FormattedMessage 
                                        id="productos.eliminar" 
                                        defaultMessage="Eliminar" 
                                    />
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Confirmación de eliminación */}
                {showDeleteConfirm === product.id && (
                    <div className="delete-confirm">
                        <p>¿Estás seguro de que quieres eliminar este producto?</p>
                        <div className="confirm-actions">
                            <button 
                                onClick={() => deleteProduct(product.id)}
                                className="btn-confirm-delete"
                                disabled={globalLoading}
                            >
                                Sí, eliminar
                            </button>
                            <button 
                                onClick={() => setShowDeleteConfirm(null)}
                                className="btn-cancel-delete"
                                disabled={globalLoading}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // Mostrar loading mientras verifica autenticación
    if (loading) {
        return (
            <div className="loading-container">
                <p>Verificando autenticación...</p>
            </div>
        );
    }

    return (
        <>
            <header>
                <div className="vender-container">
                    <h1 className='texto-vender'><FormattedMessage id='VENDER' /></h1>
                </div>
            </header>

            <div className='profile-container'>
                {/* Mostrar información del usuario autenticado */}
                <div className='welcome-message'>
                    <p>
                        <FormattedMessage 
                            id="login.welcomeUser" 
                            defaultMessage="¡Bienvenido, {usuario}!" 
                            values={{ usuario: user?.nombre }} 
                        />
                    </p>
                    <button onClick={handleLogout} className='btn-logout'>
                        <FormattedMessage id="logout.button" defaultMessage="Cerrar Sesión" />
                    </button>
                </div>

                {/* Mostrar información del stand si existe */}
                {userStand && (
                    <div className='stand-info'>
                        <h3>Mi Stand: {userStand.name}</h3>
                        <p>Universidad: {userStand.universidad}</p>
                        <p>Descripción: {userStand.descripcion}</p>
                        {userStand.emprendimiento && (
                            <p>Emprendimiento: {userStand.emprendimiento}</p>
                        )}
                    </div>
                )}

                {/* Mostrar mensaje si no tiene stand */}
                {!userStand && (
                    <div className='no-stand-message'>
                        <p>
                            <FormattedMessage 
                                id="vender.noStand" 
                                defaultMessage="No tienes un stand asignado. Dirígete a la sección de stands para reservar uno." 
                            />
                        </p>
                    </div>
                )}

                {/* Mostrar errores si existen */}
                {error && (
                    <div className='error-message'>
                        <p className='error-text'>{error}</p>
                    </div>
                )}

                {/* Secciones de funcionalidades */}
                <div className='secciones'>
                    <Link to="/stands" className='stands'>
                        <FormattedMessage id='Stand' />
                    </Link>

                    <button 
                        className='productos' 
                        onClick={() => {
                            setMostrarProductosVendidos(true);
                            setMostrarHU11(false);
                            setMostrarHU12(false);
                        }}
                        disabled={!userStand}
                        title={!userStand ? "Necesitas tener un stand para ver tus productos" : ""}
                    >
                        <FormattedMessage id='Productos_que_ya_se_estan_vendiendo' />
                        {userProducts.length > 0 && (
                            <span className='products-count'>({userProducts.length})</span>
                        )}
                    </button>

                    <button 
                        className='publicar' 
                        onClick={() => {
                            setMostrarHU12(true);
                            setMostrarHU11(false);
                            setMostrarProductosVendidos(false);
                        }}
                        disabled={!userStand}
                        title={!userStand ? "Necesitas tener un stand para publicar un emprendimiento" : ""}
                    >
                        <FormattedMessage id='Publicar_nuevo_emprendimiento' />
                    </button>

                    <button 
                        className='nuevo-producto' 
                        onClick={() => {
                            setMostrarHU11(true);
                            setMostrarHU12(false);
                            setMostrarProductosVendidos(false);
                        }}
                        disabled={!userStand}
                        title={!userStand ? "Necesitas tener un stand para agregar productos" : ""}
                    >
                        <FormattedMessage id="Agregar_nuevo_producto" defaultMessage="Agregar nuevo producto" />
                    </button>

                    <button 
                        className='universidades'
                        disabled={!userStand}
                        title={userStand ? `Universidad: ${userStand.universidad}` : "Necesitas tener un stand"}
                    >
                        <FormattedMessage id='Universidad' />
                        {userStand && (
                            <span className='universidad-info'>: {userStand.universidad}</span>
                        )}
                    </button>
                </div>

                {/* Mostrar componente correspondiente según selección */}
                {mostrarHU11 && userStand && (
                    <HU11 
                        standId={userStand.id} 
                        onProductCreated={refreshData}
                    />
                )}
                {mostrarHU12 && userStand && (
                    <HU12 
                        stand={userStand} 
                        user={user}
                        onEmprendimientoCreated={refreshData}
                    />
                )}
                
                {/* Sección de Productos Vendidos - Integrada directamente */}
                {mostrarProductosVendidos && userStand && (
                    <div className="productos-vendidos-section">
                        <h2>
                            <FormattedMessage 
                                id="productos.vendidos.title" 
                                defaultMessage="Productos que ya se están vendiendo" 
                            />
                        </h2>

                        <div className="stand-info-productos">
                            <p>Stand: <strong>{userStand.name}</strong></p>
                            <p>Universidad: <strong>{userStand.universidad}</strong></p>
                        </div>

                        {userProducts.length === 0 ? (
                            <div className="no-products-message">
                                <p>
                                    <FormattedMessage 
                                        id="productos.vendidos.empty" 
                                        defaultMessage="Aún no tienes productos en venta. ¡Agrega tu primer producto!" 
                                    />
                                </p>
                            </div>
                        ) : (
                            <div className="productos-grid">
                                {userProducts.map((product) => (
                                    <ProductCard 
                                        key={product.id} 
                                        product={product} 
                                        onUpdate={refreshData}
                                        loading={loading}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Loading overlay cuando está procesando */}
                {loading && (
                    <div className="loading-overlay">
                        <p>Procesando...</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default Vender;