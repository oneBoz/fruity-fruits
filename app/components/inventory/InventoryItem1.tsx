type InventoryItem1Props = {
    imageSrc: string;
    name: string;
    id: string;
};

const InventoryItem1 = ({id, name, imageSrc}: InventoryItem1Props) => {
    return (
        <section className="inventory section" id={id}>
            <div className="inventory__bg">
                <div className="inventory__container container grid">
                    <img src={imageSrc} alt="image" className="inventory__img"/>
                    <div className="inventory__data">
                        <h2 className="inventory__title">{name}</h2>
                        <p className="inventory__description">Order now</p>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default InventoryItem1;