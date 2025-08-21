"use client"

import FruitSection from "@/app/components/store/FruitSection";

const StoreSection = () => {
    return (
        <section className="fruits section" id="store">
            <h2 className="section__title">Store</h2>
            <span className="section__subtitle">What I sell</span>

            <div className="fruits__container container grid">
                <FruitSection
                    id={"apple"}
                    name={"Apple"}
                    imageSrc={"/images/fruits/apple/apple_icon.png"}
                />
                <FruitSection
                    id={"orange"}
                    name={"Orange"}
                    imageSrc={"/images/fruits/orange/orange_icon.png"}
                />
                <FruitSection
                    id={"banana"}
                    name={"Banana"}
                    imageSrc={"/images/fruits/banana/banana_icon.png"}
                />
                <FruitSection
                    id={"mango"}
                    name={"Mango"}
                    imageSrc={"/images/fruits/mango/mango_icon.png"}
                />

            </div>
        </section>
    )
}

export default StoreSection;