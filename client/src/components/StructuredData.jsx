import React from "react";
import { Helmet } from "react-helmet-async";

export default function StructuredData({ companies = [], mattresses = [], mattress = null, faqQuestions = [], faqAnswers = [], company = '', type = '' }) {
    // Organization
    const org = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "LIRON",
        "url": "https://liron-mattress.ru/",
        "logo": "https://liron-mattress.ru/main_logo.png",
        "contactPoint": [{
            "@type": "ContactPoint",
            "telephone": "+7 920 921-93-11",
            "contactType": "customer service",
            "areaServed": "RU"
        }],
        "sameAs": [
            "https://vk.com/liron_mattress"
        ]
    };

    // WebSite
    const website = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "LIRON — матрасы для фур и грузовиков",
        "url": "https://liron-mattress.ru/"
    };

    // LocalBusiness (for contacts)
    const localBusiness = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "LIRON",
        "image": "https://liron-mattress.ru/main_logo.png",
        "telephone": "+7 920 921-93-11",
        "email": "Voroxobov.a@mail.ru",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "ул. Муромская, 2а",
            "addressLocality": "Муром",
            "addressRegion": "Владимирская область",
            "postalCode": "602200",
            "addressCountry": "RU"
        },
        "openingHours": "Mo-Su 09:00-21:00"
    };

    // ItemList (for catalog/brands or mattresses)
    let itemList = null;
    if (companies && companies.length > 0) {
        itemList = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Бренды матрасов для грузовиков",
            "itemListElement": companies.map((c, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "name": c.name,
                "url": `https://liron-mattress.ru/catalog/${c.name?.toLowerCase?.()}`
            }))
        };
    } else if (mattresses && mattresses.length > 0) {
        itemList = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": `Матрасы для грузовиков ${company}`,
            "itemListElement": mattresses.map((m, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "name": m.name,
                "url": `https://liron-mattress.ru/catalog/${company?.toLowerCase?.()}/${m.id}`
            }))
        };
    }

    // Product (for product page)
    let product = null;
    if (mattress && mattress.id) {
        product = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": `Матрас для фуры ${mattress.name}`,
            "image": Array.isArray(mattress.pictures) ? mattress.pictures.map(p => typeof p === 'string' ? p : p.original) : undefined,
            "description": mattress.description || `Матрас для грузовика ${mattress.name}`,
            "brand": {
                "@type": "Brand",
                "name": mattress.company
            },
            "offers": {
                "@type": "Offer",
                "price": Array.isArray(mattress.price) ? (mattress.price[0]?.[0] || mattress.price[0] || "") : mattress.price || "",
                "priceCurrency": "RUB",
                "availability": "https://schema.org/InStock"
            }
        };
    }

    // FAQ
    const faq = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqQuestions.map((q, i) => ({
            "@type": "Question",
            "name": q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": typeof faqAnswers[i] === "string" ? faqAnswers[i] : ""
            }
        }))
    };

    return (
        <Helmet>
            <script type="application/ld+json">{JSON.stringify(org)}</script>
            <script type="application/ld+json">{JSON.stringify(website)}</script>
            {type === "localbusiness" && <script type="application/ld+json">{JSON.stringify(localBusiness)}</script>}
            {itemList && <script type="application/ld+json">{JSON.stringify(itemList)}</script>}
            {product && <script type="application/ld+json">{JSON.stringify(product)}</script>}
            {(faqQuestions.length > 0 && faqAnswers.length > 0) || type === "faq" ? (
                <script type="application/ld+json">{JSON.stringify(faq)}</script>
            ) : null}
        </Helmet>
    );
} 