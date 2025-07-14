const express = require('express');
const app = express();
const port = 3000;

// Enable CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.json());

//delay func
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const categories = [
    { categoryId: 1, name: 'Men', svgPath: 'assets/icons/category-icon-1.svg' },
    { categoryId: 2, name: 'Women', svgPath: 'assets/icons/category-icon-2.svg' },
    { categoryId: 3, name: 'Devices', svgPath: 'assets/icons/category-icon-3.svg' },
    { categoryId: 4, name: 'Gadgets', svgPath: 'assets/icons/category-icon-4.svg' },
    { categoryId: 5, name: 'Gaming', svgPath: 'assets/icons/category-icon-5.svg' },
];

const products = [
    {
        productId: 1,
        categoryId: 3,
        name: 'BeoPlay Speaker',
        promotion: "Best Selling",
        section: "Bang & Olufsen",
        details: "BeoPlay Speaker is a high-end portable speaker with exceptional sound quality.",
        imagePath: "assets/images/products/product_1.png",
        colours: ["Black", "White", "Gray"],
        sizes: ["S", "M", "L", "XL"],
        price: 755.0,
        reviews: [
            { id: 1, author: "Samuel Smith", content: "Wonderful jean, perfect gift for my girl for our anniversary!", rating: 4 },
            { id: 2, author: "Beth Aida", content: "The shoes were very comfortable and fit just right.", rating: 3 },
            { id: 3, author: "Jeremy Winston", content: "The Leather is Buttery Soft - High Quality and the Insole is very soft as well. Very Comfortable shoes!", rating: 3 }
        ]
    },
    {
        productId: 2,
        categoryId: 1,
        name: 'Nike Dri-FIT',
        promotion: "Best Selling",
        section: "Long-Sleeve",
        details: "Nike Dri-FIT is a polyester fabric designed to help you keep dry so you can more comfortably work",
        imagePath: "assets/images/products/product_2.png",
        colours: ["Black", "White", "Blue"],
        sizes: ["S", "M", "L", "XL"],
        price: 215.0,
        reviews: [
            { id: 1, author: "Samuel Smith", content: "Wonderful jean, perfect gift for my girl for our anniversary!", rating: 4 },
            { id: 2, author: "Beth Aida", content: "The shoes were very comfortable and fit just right.", rating: 3 },
            { id: 3, author: "Jeremy Winston", content: "The Leather is Buttery Soft - High Quality and the Insole is very soft as well. Very Comfortable shoes!", rating: 3 }
        ]
    },
    {
        productId: 3,
        categoryId: 4,
        name: 'Leather Wristwatch',
        promotion: "Best Selling",
        section: "Tag Heuer",
        details: "Leather Wristwatch is a premium watch crafted with the finest materials.",
        imagePath: "assets/images/products/product_3.png",
        colours: ["Black", "Brown"],
        sizes: ["M", "L"],
        price: 450.0,
        reviews: [
            { id: 1, author: "Samuel Smith", content: "Wonderful jean, perfect gift for my girl for our anniversary!", rating: 4 },
            { id: 2, author: "Beth Aida", content: "The shoes were very comfortable and fit just right.", rating: 3 },
            { id: 3, author: "Jeremy Winston", content: "The Leather is Buttery Soft - High Quality and the Insole is very soft as well. Very Comfortable shoes!", rating: 3 }
        ]
    },
    {
        productId: 4,
        categoryId: 1,
        name: 'Nike Air Force',
        promotion: "More to Explore",
        section: "High Top",
        details: "Nike Air Force is a high-end sneaker with exceptional comfort.",
        imagePath: "assets/images/products/product_4.png",
        colours: ["Black", "White", "Gray"],
        sizes: ["S", "M", "L", "XL"],
        price: 385.0,
        reviews: [
            { id: 1, author: "Samuel Smith", content: "Wonderful jean, perfect gift for my girl for our anniversary!", rating: 4 },
            { id: 2, author: "Beth Aida", content: "The shoes were very comfortable and fit just right.", rating: 3 },
            { id: 3, author: "Jeremy Winston", content: "The Leather is Buttery Soft - High Quality and the Insole is very soft as well. Very Comfortable shoes!", rating: 3 }
        ]
    },
    {
        productId: 5,
        categoryId: 4,
        name: 'Aonic 50',
        promotion: "More to Explore",
        section: "Wireless Noise",
        details: "Aonic 50 is a premium wireless headphone with noise-canceling features.",
        imagePath: "assets/images/products/product_5.png",
        colours: ["Black", "Silver"],
        sizes: ["M", "L"],
        price: 450.0,
        reviews: [
            { id: 1, author: "Samuel Smith", content: "Wonderful jean, perfect gift for my girl for our anniversary!", rating: 4 },
            { id: 2, author: "Beth Aida", content: "The shoes were very comfortable and fit just right.", rating: 3 },
            { id: 3, author: "Jeremy Winston", content: "The Leather is Buttery Soft - High Quality and the Insole is very soft as well. Very Comfortable shoes!", rating: 3 }
        ]
    },
    {
        productId: 6,
        categoryId: 5,
        name: 'Viper Mini',
        promotion: "More to Explore",
        section: "Gaming Mouse",
        details: "Viper Mini is a lightweight gaming mouse designed for esports.",
        imagePath: "assets/images/products/product_6.png",
        colours: ["Black", "White"],
        sizes: ["M", "L"],
        price: 578.0,
        reviews: [
            { id: 1, author: "Samuel Smith", content: "Wonderful jean, perfect gift for my girl for our anniversary!", rating: 4 },
            { id: 2, author: "Beth Aida", content: "The shoes were very comfortable and fit just right.", rating: 3 },
            { id: 3, author: "Jeremy Winston", content: "The Leather is Buttery Soft - High Quality and the Insole is very soft as well. Very Comfortable shoes!", rating: 3 }
        ]
    },
    {
        productId: 7,
        categoryId: 1,
        name: 'Adidas Sneakers',
        promotion: "More to Explore",
        section: "Animal Print",
        details: "Adidas Sneakers are stylish and comfortable shoes perfect for everyday wear.",
        imagePath: "assets/images/products/product_7.png",
        colours: ["Black", "White"],
        sizes: ["M", "L"],
        price: 396.0,
        reviews: [
            { id: 1, author: "Samuel Smith", content: "Wonderful jean, perfect gift for my girl for our anniversary!", rating: 4 },
            { id: 2, author: "Beth Aida", content: "The shoes were very comfortable and fit just right.", rating: 3 },
            { id: 3, author: "Jeremy Winston", content: "The Leather is Buttery Soft - High Quality and the Insole is very soft as well. Very Comfortable shoes!", rating: 3 }
        ]
    },
    {
        productId: 8,
        categoryId: 1,
        name: 'White T-Shirt',
        promotion: "More to Explore",
        section: "Short Sleeve",
        details: "White T-Shirt is a classic wardrobe staple made from soft, breathable fabric.",
        imagePath: "assets/images/products/product_8.png",
        colours: ["White"],
        sizes: ["S", "M", "L"],
        price: 124.0,
        reviews: [
            { id: 1, author: "Samuel Smith", content: "Wonderful jean, perfect gift for my girl for our anniversary!", rating: 4 },
            { id: 2, author: "Beth Aida", content: "The shoes were very comfortable and fit just right.", rating: 3 },
            { id: 3, author: "Jeremy Winston", content: "The Leather is Buttery Soft - High Quality and the Insole is very soft as well. Very Comfortable shoes!", rating: 3 }
        ]
    },
    {
        productId: 9,
        categoryId: 2,
        name: 'Mini Dress',
        promotion: "More to Explore",
        section: "Cowl Neck",
        details: "Black Mini Dress is a classic wardrobe staple made from soft, breathable fabric.",
        imagePath: "assets/images/products/product_9.png",
        colours: ["Brown", "Black"],
        sizes: ["S", "M", "L"],
        price: 427.0,
        reviews: [
            { id: 1, author: "Samuel Smith", content: "Wonderful jean, perfect gift for my girl for our anniversary!", rating: 4 },
            { id: 2, author: "Beth Aida", content: "The shoes were very comfortable and fit just right.", rating: 3 },
            { id: 3, author: "Jeremy Winston", content: "The Leather is Buttery Soft - High Quality and the Insole is very soft as well. Very Comfortable shoes!", rating: 3 }
        ]
    },
    {
        productId: 10,
        categoryId: 3,
        name: 'Smart Home Hub',
        promotion: "More to Explore",
        section: "Google Nest",
        details: "Control your smart home devices with this central hub.",
        imagePath: "assets/images/products/product_10.png",
        colours: ["Chalk", "Charcoal"],
        sizes: ["One Size"],
        price: 129.0,
        reviews: [
            { id: 1, author: "Alex Johnson", content: "Makes life so much easier!", rating: 5 },
            { id: 2, author: "Maria Garcia", content: "A bit tricky to set up, but works great now.", rating: 4 }
        ]
    },
    {
        productId: 11,
        categoryId: 2,
        name: 'Floral Maxi Dress',
        promotion: "More to Explore",
        section: "Summer Collection",
        details: "A light and airy maxi dress perfect for warm weather.",
        imagePath: "assets/images/products/product_11.png",
        colours: ["Red Floral", "Blue Floral"],
        sizes: ["S", "M", "L", "XL"],
        price: 350.0,
        reviews: [
            { id: 1, author: "Chloe Davis", content: "Beautiful dress, I get so many compliments.", rating: 5 }
        ]
    },
    {
        productId: 12,
        categoryId: 1,
        name: 'Running Shorts',
        promotion: "More to Explore",
        section: "Athletic Wear",
        details: "Breathable and lightweight shorts for your daily run.",
        imagePath: "assets/images/products/product_12.png",
        colours: ["Black", "Navy", "Red"],
        sizes: ["S", "M", "L"],
        price: 85.0,
        reviews: [
            { id: 1, author: "Tom Wilson", content: "Very comfortable for long runs.", rating: 4 },
            { id: 2, author: "Linda Brown", content: "Good quality for the price.", rating: 4 }
        ]
    },
    {
        productId: 13,
        categoryId: 5,
        name: 'Mechanical Keyboard',
        promotion: "More to Explore",
        section: "PC Gaming",
        details: "A responsive mechanical keyboard with customizable RGB lighting.",
        imagePath: "assets/images/products/product_13.png",
        colours: ["Black"],
        sizes: ["Full-size", "Tenkeyless"],
        price: 250.0,
        reviews: [
            { id: 1, author: "GamerX", content: "The clicky keys are so satisfying.", rating: 5 },
            { id: 2, author: "DevDude", content: "Great for typing and gaming.", rating: 5 }
        ]
    },
    {
        productId: 14,
        categoryId: 2,
        name: 'Denim Jacket',
        promotion: "More to Explore",
        section: "Fall Collection",
        details: "Classic denim jacket with a modern fit and durable stitching.",
        imagePath: "assets/images/products/product_14.png",
        colours: ["Blue", "Black"],
        sizes: ["S", "M", "L", "XL"],
        price: 310.0,
        reviews: [
            { id: 1, author: "Emily Stone", content: "Stylish and perfect for fall.", rating: 5 },
            { id: 2, author: "Liam Park", content: "Love the fit and quality!", rating: 4 }
        ]
    },
    {
        productId: 15,
        categoryId: 3,
        name: 'Smartwatch Pro',
        promotion: "More to Explore",
        section: "Wearables",
        details: "Advanced smartwatch with health tracking and customizable faces.",
        imagePath: "assets/images/products/product_15.png",
        colours: ["Black", "Rose Gold", "Silver"],
        sizes: ["One Size"],
        price: 599.0,
        reviews: [
            { id: 1, author: "Sofia Lee", content: "Amazing battery life and features.", rating: 5 },
            { id: 2, author: "Mark Chen", content: "Sleek design and accurate tracking.", rating: 4 }
        ]
    },
    {
        productId: 16,
        categoryId: 1,
        name: 'Comfy Joggers',
        promotion: "More to Explore",
        section: "Loungewear",
        details: "Soft joggers perfect for both workouts and lounging.",
        imagePath: "assets/images/products/product_16.png",
        colours: ["Gray", "Black", "Olive"],
        sizes: ["S", "M", "L", "XL"],
        price: 145.0,
        reviews: [
            { id: 1, author: "Nina Patel", content: "Super comfy and fits great.", rating: 5 },
            { id: 2, author: "Kyle Brooks", content: "Love wearing these around the house.", rating: 4 }
        ]
    },
    {
        productId: 17,
        categoryId: 2,
        name: 'Floral Summer Dress',
        promotion: "More to Explore",
        section: "Dresses",
        details: "Lightweight dress with vibrant floral pattern for summer occasions.",
        imagePath: "assets/images/products/product_17.png",
        colours: ["Blue", "Pink", "Yellow"],
        sizes: ["XS", "S", "M", "L"],
        price: 89.99,
        reviews: [
            { id: 1, author: "Sophia Chen", content: "Perfect for beach vacations!", rating: 5 },
            { id: 2, author: "Emma Wilson", content: "Runs slightly large but beautiful fabric.", rating: 4 }
        ]
    },
    {
        productId: 18,
        categoryId: 3,
        name: 'Wireless Earbuds Pro',
        promotion: "More to Explore",
        section: "Audio",
        details: "Noise-cancelling wireless earbuds with 24hr battery life.",
        imagePath: "assets/images/products/product_18.png",
        colours: ["White", "Black", "Space Gray"],
        sizes: ["One Size"],
        price: 199.0,
        reviews: [
            { id: 1, author: "TechEnthusiast", content: "Crystal clear sound quality!", rating: 5 },
            { id: 2, author: "MusicLover", content: "Battery lasts all day.", rating: 5 }
        ]
    },
    {
        productId: 19,
        categoryId: 4,
        name: 'Smart Fitness Band',
        promotion: "More to Explore",
        section: "Wearables",
        details: "Tracks heart rate, sleep, and 20+ workout modes with waterproof design.",
        imagePath: "assets/images/products/product_19.png",
        colours: ["Midnight Black", "Rose Gold", "Ocean Blue"],
        sizes: ["Regular", "Large"],
        price: 79.95,
        reviews: [
            { id: 1, author: "FitnessGuru", content: "Accurate tracking and comfortable.", rating: 4 },
            { id: 2, author: "Runner123", content: "Great value for the features.", rating: 5 }
        ]
    },
    {
        productId: 20,
        categoryId: 5,
        name: 'RGB Gaming Keyboard',
        promotion: "More to Explore",
        section: "Peripherals",
        details: "Mechanical keyboard with customizable RGB lighting and anti-ghosting.",
        imagePath: "assets/images/products/product_20.png",
        colours: ["Black"],
        sizes: ["Full Size"],
        price: 129.99,
        reviews: [
            { id: 1, author: "ProGamer", content: "Responsive keys for competitive play.", rating: 5 },
            { id: 2, author: "StreamerLife", content: "Love the lighting effects.", rating: 4 }
        ]
    },
    {
        productId: 21,
        categoryId: 1,
        name: 'Classic Denim Jacket',
        promotion: "More to Explore",
        section: "Outerwear",
        details: "Timeless denim jacket with modern fit and distressed details.",
        imagePath: "assets/images/products/product_21.png",
        colours: ["Light Blue", "Dark Wash"],
        sizes: ["S", "M", "L", "XL"],
        price: 125.0,
        reviews: [
            { id: 1, author: "StyleIcon", content: "Goes with everything in my wardrobe.", rating: 5 },
            { id: 2, author: "DenimFan", content: "Perfect weight for spring.", rating: 4 }
        ]
    },
    {
        productId: 22,
        categoryId: 2,
        name: 'Leather Crossbody Bag',
        promotion: "More to Explore",
        section: "Accessories",
        details: "Genuine leather bag with adjustable strap and multiple compartments.",
        imagePath: "assets/images/products/product_22.png",
        colours: ["Cognac", "Black", "Burgundy"],
        sizes: ["One Size"],
        price: 149.0,
        reviews: [
            { id: 1, author: "Fashionista", content: "Gets better with age as the leather softens.", rating: 5 },
            { id: 2, author: "TravelLover", content: "Fits all my essentials perfectly.", rating: 5 }
        ]
    },
    {
        productId: 23,
        categoryId: 3,
        name: 'Ultra HD Smart Tablet',
        promotion: "More to Explore",
        section: "Computing",
        details: "10.5\" display with stylus support and 12-hour battery for creative work.",
        imagePath: "assets/images/products/product_23.png",
        colours: ["Slate Gray", "Rose Gold"],
        sizes: ["64GB", "128GB", "256GB"],
        price: 349.99,
        reviews: [
            { id: 1, author: "DigitalArtist", content: "Pressure-sensitive stylus is game-changing.", rating: 5 },
            { id: 2, author: "StudentPro", content: "Perfect for notes and media consumption.", rating: 4 }
        ]
    },
    {
        productId: 24,
        categoryId: 4,
        name: '360° Camera Drone',
        promotion: "More to Explore",
        section: "Photography",
        details: "Foldable drone with 4K camera and obstacle avoidance system.",
        imagePath: "assets/images/products/product_24.png",
        colours: ["Matte Black"],
        sizes: ["Standard Bundle", "Pro Bundle"],
        price: 499.0,
        reviews: [
            { id: 1, author: "AerialShots", content: "Incredibly stable footage even in wind.", rating: 5 },
            { id: 2, author: "TravelVlogger", content: "Fits in my backpack - amazing portability.", rating: 4 }
        ]
    },
    {
        productId: 25,
        categoryId: 5,
        name: 'Wireless Gaming Mouse',
        promotion: "More to Explore",
        section: "Esports",
        details: "1ms response time with customizable weights and 16,000 DPI sensor.",
        imagePath: "assets/images/products/product_25.png",
        colours: ["Black/Red", "White"],
        sizes: ["One Size"],
        price: 89.95,
        reviews: [
            { id: 1, author: "FPSPro", content: "No drag from wires makes all the difference.", rating: 5 },
            { id: 2, author: "MMOPlayer", content: "12 programmable buttons are perfect for macros.", rating: 5 }
        ]
    },
    {
        productId: 26,
        categoryId: 1,
        name: 'Performance Running Shoes',
        promotion: "More to Explore",
        section: "Footwear",
        details: "Lightweight racing shoes with carbon fiber plate for energy return.",
        imagePath: "assets/images/products/product_26.png",
        colours: ["Volt/Black", "White/Red"],
        sizes: ["US 7-13"],
        price: 180.0,
        reviews: [
            { id: 1, author: "Marathoner", content: "Took 2 minutes off my 10K time!", rating: 5 },
            { id: 2, author: "WeekendRunner", content: "Surprisingly comfortable for long distances.", rating: 4 }
        ]
    },
    {
        productId: 27,
        categoryId: 2,
        name: 'Cashmere Wrap Cardigan',
        promotion: "More to Explore",
        section: "Knitwear",
        details: "100% Mongolian cashmere with delicate pearl button details.",
        imagePath: "assets/images/products/product_27.png",
        colours: ["Cream", "Dusty Pink", "Heather Gray"],
        sizes: ["XS", "S", "M"],
        price: 275.0,
        reviews: [
            { id: 1, author: "LuxuryShopper", content: "Worth every penny - like wearing a cloud.", rating: 5 },
            { id: 2, author: "FashionEditor", content: "Elevates any outfit instantly.", rating: 5 }
        ]
    },
    {
        productId: 28,
        categoryId: 3,
        name: 'Noise-Cancelling Headphones',
        promotion: "More to Explore",
        section: "Audio",
        details: "Industry-leading ANC with 30hr battery and touch controls.",
        imagePath: "assets/images/products/product_28.png",
        colours: ["Silver", "Space Black"],
        sizes: ["One Size"],
        price: 379.0,
        reviews: [
            { id: 1, author: "FrequentFlyer", content: "Complete silence on my transatlantic flights.", rating: 5 },
            { id: 2, author: "AudioPhile", content: "Balanced sound profile with deep bass.", rating: 4 }
        ]
    },
    {
        productId: 29,
        categoryId: 4,
        name: 'Smart Ring',
        promotion: "More to Explore",
        section: "Wearables",
        details: "Discreet activity tracker with sleep monitoring and gesture control.",
        imagePath: "assets/images/products/product_29.png",
        colours: ["Titanium Black", "Rose Gold", "Silver"],
        sizes: ["US 5-12"],
        price: 199.0,
        reviews: [
            { id: 1, author: "MinimalistTech", content: "Finally a fitness tracker that looks like jewelry.", rating: 5 },
            { id: 2, author: "Biohacker", content: "Accurate SpO2 readings during sleep.", rating: 4 }
        ]
    },
    {
        productId: 30,
        categoryId: 5,
        name: 'Gaming Chair Pro',
        promotion: "More to Explore",
        section: "Furniture",
        details: "4D adjustable armrests with lumbar support and memory foam headrest.",
        imagePath: "assets/images/products/product_30.png",
        colours: ["Black/Red", "White/Blue", "All Black"],
        sizes: ["Standard", "XL"],
        price: 349.95,
        reviews: [
            { id: 1, author: "StreamerPro", content: "No back pain after 8-hour streams.", rating: 5 },
            { id: 2, author: "WFHPro", content: "Makes my home office look legit.", rating: 5 }
        ]
    },
    {
        productId: 31,
        categoryId: 1,
        name: 'Italian Leather Dress Shoes',
        promotion: "More to Explore",
        section: "Footwear",
        details: "Goodyear-welted Oxfords with calfskin lining and anti-slip rubber soles.",
        imagePath: "assets/images/products/product_31.png",
        colours: ["Dark Brown", "Black"],
        sizes: ["UK 6-12", "Half Sizes Available"],
        price: 299.0,
        reviews: [
            { id: 1, author: "ClassicGent", content: "The leather molds to your feet like custom shoes.", rating: 5 },
            { id: 2, author: "Executive", content: "Received three compliments on first wear.", rating: 5 }
        ]
    },
    {
        productId: 32,
        categoryId: 2,
        name: 'Biodegradable Activewear Set',
        promotion: "More to Explore",
        section: "Sustainable Fashion",
        details: "Plant-based fabric that decomposes within 5 years, moisture-wicking technology.",
        imagePath: "assets/images/products/product_32.png",
        colours: ["Forest Green", "Ocean Blue", "Terracotta"],
        sizes: ["XS", "S", "M", "L", "XL"],
        price: 135.0,
        reviews: [
            { id: 1, author: "EcoWarrior", content: "Performs better than my synthetic workout clothes!", rating: 5 },
            { id: 2, author: "YogaInstructor", content: "Breathable and guilt-free.", rating: 4 }
        ]
    },
    {
        productId: 33,
        categoryId: 4,
        name: 'Holographic Smartwatch',
        promotion: "More to Explore",
        section: "Wearables",
        details: "Projects display above wrist with touch-sensitive air controls and health monitoring.",
        imagePath: "assets/images/products/product_33.png",
        colours: ["Neon Silver", "Phantom Black"],
        sizes: ["Standard Band", "Extended Band"],
        price: 599.0,
        reviews: [
            { id: 1, author: "TechFuturist", content: "Feels like wearing sci-fi tech - gets stares everywhere.", rating: 5 },
            { id: 2, author: "EarlyAdopter", content: "Battery lasts 7 days with normal use.", rating: 4 }
        ]
    },
    {
        productId: 34,
        categoryId: 3,
        name: 'Foldable OLED Laptop',
        promotion: "More to Explore",
        section: "Computing",
        details: "17.3\" screen that folds to tablet size with magnesium alloy hinge (2.3lbs). Includes stylus with 4096 pressure levels.",
        imagePath: "assets/images/products/product_34.png",
        colours: ["Cosmic Blue", "Lunar Silver"],
        sizes: ["1TB SSD/32GB RAM", "2TB SSD/64GB RAM"],
        price: 3499.0,
        reviews: [
            { id: 1, author: "DigitalCreator", content: "Replaces my laptop, tablet, and sketchpad - zero screen crease after 6 months.", rating: 5 },
            { id: 2, author: "CTO", content: "The future of portable workstations.", rating: 4 }
        ],
        techSpecs: {
            processor: "Intel Core i9-13900H",
            display: "17.3\" 4K OLED (100% DCI-P3)",
            battery: "22hrs (PCMark 10)"
        }
    },
    {
        productId: 35,
        categoryId: 5,
        name: 'AI-Powered Gaming Monitor',
        promotion: "More to Explore",
        section: "Displays",
        details: "32\" 8K/240Hz with NVIDIA Reflex analyzer and built-in DLSS 3.5 upscaling. Detects eye fatigue and adjusts blue light.",
        imagePath: "assets/images/products/product_35.png",
        colours: ["Quantum Black"],
        sizes: ["Standard", "Curved"],
        price: 4299.0,
        reviews: [
            { id: 1, author: "ProGamer", content: "The input lag is literally nonexistent - won 3 tournaments since upgrade.", rating: 5 },
            { id: 2, author: "GameDev", content: "Finally a monitor that renders my UE5 projects accurately.", rating: 5 }
        ],
        techSpecs: {
            responseTime: "0.03ms GTG",
            ports: "HDMI 2.1 (x3), DisplayPort 2.1 (x2)",
            features: [
                "Dynamic HDR 2000",
                "Crosshair sync with peripherals",
                "Built-in KVM switch"
            ]
        }
    }
];

// Helper function for pagination
const paginate = (items, page, pageSize) => {
    console.log(`Paginating items: ${items.length} total items, page: ${page}, pageSize: ${pageSize}`);
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    return items.slice(startIndex, endIndex);
};

// API endpoints
app.get('/api/categories', (req, res) => {
    console.log("categories provided", categories.length);
    res.json(categories);
});

// API endpoint for 'More to Explore' products with pagination
app.get('/api/products/more-to-explore', (req, res) => {
    const filteredProducts = products.filter(product => product.promotion === "More to Explore");
    if (filteredProducts.length === 0) {
        console.log("No products found for 'More to Explore'");
        return res.status(404).json({ error: 'No products found for "More to Explore"' });
    }
    const page = parseInt(req.query.page) || 1;
    console.log(`Requested page: ${page}`);
    const pageSize = parseInt(req.query.page_size) || 10;
    console.log(`Requested page size: ${pageSize}`);
    const paginatedProducts = paginate(filteredProducts, page, pageSize);
    console.log(`Sending page ${page} with ${paginatedProducts.length} 'More to Explore' products.`);
    res.json(paginatedProducts);
});

// API endpoint for 'Best Selling' products with pagination
app.get('/api/products/best-sold-products', (req, res) => {
    const filteredProducts = products.filter(product => product.promotion === "Best Selling");
    if (filteredProducts.length === 0) {
        console.log("No best selling products found");
        return res.status(404).json({ error: 'No best selling products found' });
    }
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.page_size) || 10;
    const paginatedProducts = paginate(filteredProducts, page, pageSize);
    console.log(`Sending page ${page} with ${paginatedProducts.length} 'Best Selling' products.`);
    res.json(paginatedProducts);
});

app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.productId === productId);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    console.log("passed");
    res.json(product);
});

app.listen(port, () => {
    console.log(`Mock API server running at http://localhost:${port}`);
});