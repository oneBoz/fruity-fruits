"use client"

import FruitSection from "@/app/components/store/FruitSection";
import {products} from "@/app/types/Products";

const StoreSection = () => {
    return (
        <section className="fruits section" id="store">
            <h2 className="section__title">Store</h2>
            <span className="section__subtitle">What I sell</span>

            <div className="fruits__container container grid">
                {products.map((i) => (
                    <FruitSection imageSrc={i.imageSrc} name={i.name} id={i.id} key={i.id}></FruitSection>
                ))}
            </div>
        </section>
    )
}

export default StoreSection;