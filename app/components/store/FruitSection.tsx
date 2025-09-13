"use client"

import Image from "next/image";
import Link from "next/link";

type FruitSectionProps = {
    imageSrc: string;
    name: string;
    id: string;
};

const FruitSection = ({id, name, imageSrc}: FruitSectionProps) => {
    return (
        <div className="fruits__content">
            <div>
                <Image
                    className="fruits__img"
                    src={imageSrc}
                    width={170}
                    height={170}
                    alt={name}
                />
                <h3 className="fruits__title">{name}</h3>
            </div>
            <Link href={"/pages/product#" + name}>
                <span className="button button--flex button--small button--link fruits__button">
                    Shop now
                    <i className="uil uil-arrow-right button__icon"></i>
                </span>
            </Link>


        </div>
    )
}

export default FruitSection;