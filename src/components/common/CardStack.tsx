import Image from "next/image";
import styles from "@/src/components/common/CardStack.module.css";

const images = [
  "/images/events/1.png",
  "/images/events/2.jpg",
  "/images/events/3.jpeg",
  "/images/events/4.jpeg",
  "/images/events/5.jpeg",
  "/images/events/6.jpeg",
  "/images/events/7.png",
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
