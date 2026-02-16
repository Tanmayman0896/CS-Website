import Image from "next/image";
import styles from "@/src/components/common/CardStack.module.css";

const images = [
  "/images/events/1.svg",
  "/images/events/2.svg",
  "/images/events/3.svg",
  "/images/events/4.svg",
  "/images/events/5.svg",
  "/images/events/6.svg",
  "/images/events/7.svg",
];
export default function CardStack() {
  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>IEEE CS</h1>

      <div className={styles.cards}>
        {images.map((src, index) => (
          <div key={index} className={styles.card}>
            <Image
              src={src}
              alt={`card-${index}`}
              fill
              sizes="(max-width:768px) 100vw, 30vmin"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
