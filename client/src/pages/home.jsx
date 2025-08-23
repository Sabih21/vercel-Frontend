import { useState, useEffect } from "react";
import { getAllProducts } from "../utils/product-api.js";
import { getAllCategories } from "../utils/category-api.js";
import ProductCarousel from "@/components/ProductCarousel";
import HeroSection from "../components/Hero";
import WhatsNew from "../components/WhatsNew";
import MoreToExploreCarousel from "../components/MoreToExploreCarousel";
import StyleByYouCarousel from "../components/StyleByYouCarousel.jsx";
import Navbar from "../components/Navbar.jsx";
import FooterSection from "../components/Footer.jsx";

// SHOP BY CATEGORY data
const shopCategories = [
  {
    name: "Women Fashion",
    img: "https://media.istockphoto.com/id/505534803/photo/young-beautiful-women-shopping-at-the-weekly-cloth-market.jpg?s=612x612&w=0&k=20&c=cedc1imhUYnc6hw7tgd0pHXA_gMe2-cNmpTRJ_63g7w=",
  },
  {
    name: "Men Fashion",
    img: "https://scontent.fkhi2-2.fna.fbcdn.net/v/t39.30808-6/482962273_660301246378121_288575350348661627_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=B0gOYzA4ZZAQ7kNvwEt1BZ8&_nc_oc=AdndFYWUhahCLgdiVRum7ETxsUIP1muRoXP-p202OXQZ7_69vSiBJ_dnjfB7G092c4o&_nc_zt=23&_nc_ht=scontent.fkhi2-2.fna&_nc_gid=wMUaZ1ZDNGVHJgyRS79rFQ&oh=00_AfUYP5i8uJs_racazCq6BP-xN-yp5wCEGzQ31Pba1lpTzA&oe=68A37437",
  },
  {
    name: "Accessories",
    img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1920&auto=format&fit=crop",
  },
  {
    name: "Footwear",
    img: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1920&auto=format&fit=crop",
  },
  {
    name: "Jewelry",
    img: "https://plus.unsplash.com/premium_photo-1681276170092-446cd1b5b32d?w=800&auto=format&fit=crop&q=60",
  },
];

// TRENDING Products data
const trendingCategories = [
  {
    name: "Women Fashion",
    brand: "RTW Pehchan Edit",
    price: "Rs. 5,490.00",
    tag: "NEW IN",
    img: "https://media.istockphoto.com/id/505534803/photo/young-beautiful-women-shopping-at-the-weekly-cloth-market.jpg?s=612x612&w=0&k=20&c=cedc1imhUYnc6hw7tgd0pHXA_gMe2-cNmpTRJ_63g7w=",
  },
  {
    name: "Men Fashion",
    brand: "RTW Classic Edition",
    price: "Rs. 8,990.00",
    tag: "TRENDING",
    img: "https://scontent.fkhi2-2.fna.fbcdn.net/v/t39.30808-6/482962273_660301246378121_288575350348661627_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=B0gOYzA4ZZAQ7kNvwEt1BZ8&_nc_oc=AdndFYWUhahCLgdiVRum7ETxsUIP1muRoXP-p202OXQZ7_69vSiBJ_dnjfB7G092c4o&_nc_zt=23&_nc_ht=scontent.fkhi2-2.fna&_nc_gid=wMUaZ1ZDNGVHJgyRS79rFQ&oh=00_AfUYP5i8uJs_racazCq6BP-xN-yp5wCEGzQ31Pba1lpTzA&oe=68A37437",
  },
  {
    name: "Accessories",
    brand: "Luxury Accents",
    price: "Rs. 5,990.00",
    tag: "BEST SELLER",
    img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1920&auto=format&fit=crop",
  },
  {
    name: "Jewelry",
    brand: "Royal Elegance",
    price: "Rs. 5,990.00",
    tag: "HOT",
    img: "https://plus.unsplash.com/premium_photo-1681276170092-446cd1b5b32d?w=800&auto=format&fit=crop&q=60",
  },
];


export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);

  // 🛒 Products
  useEffect(() => {
    getAllProducts().then((res) => {
      if (res.success) {
        // Backend se jo string arrays aa rahe hain unko parse karo
        // console.log(res.data);

        const formatted = res?.data?.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          category: p.category?.name,
          trending_product: p.trending_product,
          description: p.description,
          sku: p.sku,
          stock_quantity: p.stock_quantity,
          discount: p.discount,
          brand: p.brand,
          tag: p.tags,
          model_wears: p.model_wears,
          whats_new: p.whats_new,
          is_special: p.is_special,
          colors: p.colors ? JSON.parse(p.colors) : [],
          fabrics: p.fabrics ? JSON.parse(p.fabrics) : [],
          fits: p.fits ? JSON.parse(p.fits) : [],
          img: JSON.parse(p.productImg)[0],
          sizes: p.sizes ? JSON.parse(p.sizes) : [],
        }));
        // console.log("formatted: ", formatted);

        setProducts(formatted);
      }
    });
  }, []);

  // 📂 Categories
  useEffect(() => {
    getAllCategories().then((res) => {
      if (res.success) {
        const formattedCats = res?.categories?.map((c) => ({
          id: c.id,
          name: c.name,
          img: JSON.parse(c.category_img)[0], // backend se JSON aa rahi hai
        }));
        setCategories(formattedCats);
      }
    });
  }, []);

  // useEffect(() => {
  //   getAllCategories().then((res) => {
  //     console.log(res.data);

  //     if (res.success) {
  //       const formattedCategorys = res?.data?.map((c) => ({
  //         id: c.id,
  //         name: c.name,
  //         image: c.category_img,
  //       }));
  //       console.log("formattedCategorys: ", formattedCategorys);

  //       setCategory(formattedCategorys);
  //     }
  //   });
  // }, []);

  return (
    <>
      <Navbar />
      <HeroSection />
      <WhatsNew />

      {/* SHOP BY CATEGORY => ab categories API se aayengi */}
      <ProductCarousel
        title="SHOP BY CATEGORY"
        categories={categories}
      />

      {/* TRENDING => products se hi aayega */}
      <ProductCarousel title="TRENDING" categories={products} />

      {/* <MoreToExploreCarousel /> */}
      <StyleByYouCarousel />
      <FooterSection />
    </>
  );
}
