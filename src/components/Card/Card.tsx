import type { Product } from '@/types';
import styles from './Card.module.scss';

interface CardProps {
    product: Product;
    onClick?: (product: Product) => void;
}

const Card = ({ product, onClick }: CardProps) => {
    const handleClick = () => {
        if (onClick) {
            onClick(product);
        }
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <span key={i} className={styles.star}>
                        ★
                    </span>
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <span key={i} className={styles.star}>
                        ★
                    </span>
                );
            } else {
                stars.push(
                    <span key={i} className={styles.starEmpty}>
                        ★
                    </span>
                );
            }
        }
        return stars;
    };

    const calculatePrice = () => {
        const discountAmount = (product.price * product.discountPercentage) / 100;
        return product.price - discountAmount;
    };

    const finalPrice = calculatePrice();

    return (
        <div className={styles.card} onClick={handleClick}>
            <div className={styles.imageContainer}>
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className={styles.image}
                />
                {product.discountPercentage > 0 && (
                    <div className={styles.discount}>
                        -{product.discountPercentage}%
                    </div>
                )}
            </div>

            <div className={styles.content}>
                <div className={styles.brand}>{product.brand}</div>

                <h3 className={styles.title}>{product.title}</h3>

                <p className={styles.description}>{product.description}</p>

                <div className={styles.rating}>
                    <div className={styles.stars}>
                        {renderStars(product.rating)}
                    </div>
                    <span className={styles.ratingValue}>
                        ({product.rating.toFixed(1)})
                    </span>
                </div>

                <div className={styles.priceContainer}>
                    <span className={styles.price}>
                        ${finalPrice.toFixed(2)}
                    </span>
                    {product.discountPercentage > 0 && (
                        <span className={styles.originalPrice}>
                            ${product.price.toFixed(2)}
                        </span>
                    )}
                </div>

                <div className={`${styles.stock} ${product.stock > 0 ? styles.inStock : styles.outOfStock}`}>
                    {product.stock > 0 ? `En stock (${product.stock})` : 'Agotado'}
                </div>
            </div>
        </div>
    );
};

export default Card;