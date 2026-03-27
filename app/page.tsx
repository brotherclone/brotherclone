import { getActiveProduct } from "@/lib/fourthwall";
import styles from "./page.module.scss";

// Revalidate every 60s — cron job also triggers revalidatePath("/")
export const revalidate = 60;

export default async function DropPage() {
  const product = await getActiveProduct();

  return (
    <main className={styles["drop-page"]}>
      <header className={styles["drop-header"]}>
        <span className={styles["drop-header__wordmark"]}>brotherclone</span>
      </header>

      {product ? (
        <section className={styles["drop-card"]}>
          {product.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.imageUrl}
              alt={product.name}
              className={styles["drop-card__image"]}
            />
          )}

          <div className={styles["drop-card__body"]}>
            <h1 className={styles["drop-card__name"]}>{product.name}</h1>
            <p className={styles["drop-card__description"]}>{product.description}</p>

            <div className={styles["drop-card__footer"]}>
              <span className={styles["drop-card__price"]}>
                ${(product.price / 100).toFixed(2)}
              </span>
              <span className={`${styles["drop-card__mode"]} ${styles[`drop-card__mode--${product.mode}`]}`}>
                {product.mode}
              </span>
            </div>

            {product.mode === "affiliate" && product.affiliateUrl ? (
              <a
                href={product.affiliateUrl}
                className={styles["drop-card__cta"]}
                target="_blank"
                rel="noopener noreferrer"
              >
                get it →
              </a>
            ) : (
              <button className={styles["drop-card__cta"]}>
                add to cart
              </button>
            )}
          </div>
        </section>
      ) : (
        <section className={styles["drop-empty"]}>
          <p>nothing today. check back soon.</p>
        </section>
      )}

      <footer className={styles["drop-footer"]}>
        <a href="/archive">archive</a>
      </footer>
    </main>
  );
}
