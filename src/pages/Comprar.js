    import React, { useState } from 'react';
    import './Comprar.css';
    import {Link} from 'react-router-dom';

    const StandsListing = () => {
    const [selectedUniversity, setSelectedUniversity] = useState('todas');
    const [selectedCategory, setSelectedCategory] = useState('todos');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('rating');
    const [favorites, setFavorites] = useState([]);

    // Datos de ejemplo
    const stands = [
        {
        id: 1,
        name: "Tangas la macarena",
        university: "Universidad Distrital",
        category: "Ropa y Accesorios",
        rating: 4.8,
        reviews: 234,
        priceRange: "$",
        image: "/maca.jpg",
        location: "Edificio de Economía, Piso 1",
        openTime: "7:00 AM - 6:00 PM",
        tags: ["Café", "Desayunos", "WiFi gratis"],
        trending: true,
        distance: "5 min caminando"
        },
        {
        id: 2,
        name: "TechStore Campus",
        university: "Universidad de los Andes",
        category: "Tecnología",
        rating: 4.6,
        reviews: 189,
        priceRange: "$$$",
        image: "",
        location: "Bloque ML, Local 102",
        openTime: "9:00 AM - 7:00 PM",
        tags: ["Laptops", "Accesorios", "Reparaciones"],
        trending: false,
        distance: "10 min caminando"
        },
        {
        id: 3,
        name: "Papelería Creativa",
        university: "Universidad Javeriana",
        category: "Papelería",
        rating: 4.5,
        reviews: 156,
        priceRange: "$",
        image: "",
        location: "Edificio Central, Sótano",
        openTime: "8:00 AM - 8:00 PM",
        tags: ["Útiles", "Impresiones", "Fotocopias"],
        trending: false,
        distance: "3 min caminando"
        },
        {
        id: 4,
        name: "Fashion Corner",
        university: "Universidad Nacional",
        category: "Ropa y Accesorios",
        rating: 4.7,
        reviews: 298,
        priceRange: "$$",
        image: "",
        location: "Plaza de Comidas, Local 5",
        openTime: "10:00 AM - 8:00 PM",
        tags: ["Ropa universitaria", "Accesorios", "Descuentos"],
        trending: true,
        distance: "7 min caminando"
        },
        {
        id: 5,
        name: "Librería Académica",
        university: "Universidad Javeriana",
        category: "Libros",
        rating: 4.9,
        reviews: 412,
        priceRange: "$$",
        image: "",
        location: "Biblioteca Central, Entrada",
        openTime: "8:00 AM - 9:00 PM",
        tags: ["Libros académicos", "Literatura", "Descuentos estudiantes"],
        trending: false,
        distance: "2 min caminando"
        },
        {
        id: 6,
        name: "Healthy Bites",
        university: "Universidad de los Andes",
        category: "Comida y Bebidas",
        rating: 4.4,
        reviews: 178,
        priceRange: "$$$",
        image: "",
        location: "Edificio Santo Domingo",
        openTime: "7:30 AM - 5:00 PM",
        tags: ["Comida saludable", "Vegano", "Sin gluten"],
        trending: true,
        distance: "8 min caminando"
        }
    ];

    const universities = ["todas", "Universidad Nacional", "Universidad de los Andes", "Universidad Javeriana"];
    const categories = ["todos", "Comida y Bebidas", "Tecnología", "Papelería", "Ropa y Accesorios", "Libros"];

    const toggleFavorite = (standId) => {
        setFavorites(prev => 
        prev.includes(standId) 
            ? prev.filter(id => id !== standId)
            : [...prev, standId]
        );
    };

    const filteredStands = stands.filter(stand => {
        const matchesUniversity = selectedUniversity === 'todas' || stand.university === selectedUniversity;
        const matchesCategory = selectedCategory === 'todos' || stand.category === selectedCategory;
        const matchesSearch = stand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            stand.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesUniversity && matchesCategory && matchesSearch;
    });

    const sortedStands = [...filteredStands].sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'reviews') return b.reviews - a.reviews;
        if (sortBy === 'distance') return parseInt(a.distance) - parseInt(b.distance);
        return 0;
    });

    return (
        <div className="stands-listing-container">
        {/* Header con búsqueda */}
        <div className="search-header">
            <div className="header-content">
            <h1 className="page-title">Stands Universitarios</h1>
            
            {/* Barra de búsqueda */}
            <div className="search-container">
                <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                type="text"
                placeholder="Buscar stands, comida, productos..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            </div>
        </div>

        {/* Filtros */}
        <div className="filters-section">
            <div className="filters-container">
            <button className="filter-button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                </svg>
                <span>Filtros</span>
            </button>

            {/* Filtro Universidad */}
            <select 
                className="filter-select"
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
            >
                {universities.map(uni => (
                <option key={uni} value={uni}>
                    {uni === 'todas' ? 'Todas las universidades' : uni}
                </option>
                ))}
            </select>

            {/* Filtro Categoría */}
            <select 
                className="filter-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                {categories.map(cat => (
                <option key={cat} value={cat}>
                    {cat === 'todos' ? 'Todas las categorías' : cat}
                </option>
                ))}
            </select>

            {/* Ordenar por */}
            <select 
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="rating">Mayor calificación</option>
                <option value="reviews">Más reseñas</option>
                <option value="distance">Más cercano</option>
            </select>
            </div>
        </div>

        {/* Resultados */}
        
        <div className="results-container">
            <Link to="/anuncio-stand" className="results-link">
            <p className="results-count">{sortedStands.length} stands encontrados</p>
            
            <div className="stands-grid">
            {sortedStands.map(stand => (
                <div key={stand.id} className="stand-card">
                {/* Imagen */}
                <div className="stand-image-container">
                    <img 
                    src={stand.image} 
                    alt={stand.name}
                    className="stand-image"
                    />
                    {stand.trending && (
                    <div className="trending-badge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                        </svg>
                        Trending
                    </div>
                    )}
                    <button 
                    onClick={() => toggleFavorite(stand.id)}
                    className="favorite-button"
                    >
                    <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill={favorites.includes(stand.id) ? "#ef4444" : "none"}
                        stroke={favorites.includes(stand.id) ? "#ef4444" : "currentColor"}
                        strokeWidth="2"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    </button>
                </div>

                {/* Contenido */}
                <div className="stand-content">
                    <div className="stand-header">
                    <h3 className="stand-name">{stand.name}</h3>
                    <span className="price-range">{stand.priceRange}</span>
                    </div>

                    {/* Rating */}
                    <div className="rating-container">
                    <div className="rating-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                        <span>{stand.rating}</span>
                    </div>
                    <span className="reviews-count">({stand.reviews} reseñas)</span>
                    </div>

                    {/* Categoría y Universidad */}
                    <div className="meta-info">
                    <p>{stand.category} • {stand.university}</p>
                    </div>

                    {/* Tags */}
                    <div className="tags-container">
                    {stand.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="tag">
                        {tag}
                        </span>
                    ))}
                    </div>

                    {/* Ubicación y horario */}
                    <div className="location-info">
                    <div className="info-row">
                        <svg className="info-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span>{stand.location} • {stand.distance}</span>
                    </div>
                    <div className="info-row">
                        <svg className="info-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        <span>{stand.openTime}</span>
                    </div>
                    </div>
                </div>
                </div>
            ))}
            </div>
            </Link>            
        </div>
        </div>
    );
    };

    export default StandsListing;