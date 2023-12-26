import ImageHoverZoom from "../../css";
import styles from "../../User.module.css";
import React from "react";
const Home = () => {
  return (
    <>
      <div className={styles.mainThumnail}>
        <img
          src={
            "https://cdn.vnda.com.br/1440x/adornashop/2023/08/17/14_8_1_195_BANNERSITEADORNA.png?v=1695396494"
          }
        />
      </div>
      <div className={styles.thumnailToShopItem}>
        <div>
          <ImageHoverZoom
            src={
              "https://cdn.vnda.com.br/adornashop/2023/02/27/17_19_55_379_829955_8d16f380e94b4f19b6c3e25c22d407c7-mv2.jpg?v=1677529195"
            }
            alt={""}
          />
          <button className={styles.btnThumnailToShop}>Rings Collection</button>
        </div>
        <div>
          <h1
            style={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            OUR COLLECTION
          </h1>
          <ImageHoverZoom
            src={
              "https://cdn.vnda.com.br/adornashop/2023/09/14/15_42_50_454_15_9_2_293_adornarafacouto_porlucasdaneris1min.jpg?v=1694717140"
            }
            alt={""}
          />
          <button className={styles.btnThumnailToShop}>
            Necklaces Collection
          </button>
        </div>
        <div>
          {" "}
          <ImageHoverZoom
            src={
              "https://cdn.vnda.com.br/adornashop/2023/09/14/16_07_39_831_16_9_3_360_adornarafacouto_porlucasdaneris40min.jpg?v=1694718479"
            }
            alt={""}
          />
          <button className={styles.btnThumnailToShop}>
            Bracelets Collection
          </button>
        </div>
      </div>
      <div className={styles.aboutIntro}>
        <h1>OUR STORY</h1>
        <p>
          ADORNA SHOP é uma marca brasileira que oferece joias atemporais e
          acessórios de qualidade e de preço acessível. Somos apaixonadas por
          trazer uma curadoria de joias perfeitas para você, e incentivar para
          que se sintam mais incríveis do que já são. Com estilo clássico, que
          idealmente se torna parte da sua rotina. Nossa paixão por excelência é
          o que nos inspira desde o começo, e continua nos motivando até hoje.
          Nossa marca possuí acessórios no estilo minimalista, são peças
          atemporais, perfeitas para qualquer mood ou ocasião.
        </p>
        <span>LEARN MORE</span>
      </div>
      <div className={styles.previewCandles}>
        <div className={styles.previewCandlesContentt}>
          <p>ESCAPE TO THE ISLAND'S TEMPLE</p>
          <p>BALI ESCAPIST</p>
          <p>
            On a balmy day in Bali, the soothing aroma of frangipani incense
            escapes from a local temple while fragrant champaca petals rain from
            the sky, a heavenly blend of smoke and light warm floralcy. Top
            notes of orange and sweet saffron sing above a heart of magnolia
            champaca and peppery elemi while notes of smoky incense and
            patchouli hum quietly at the base.
          </p>
        </div>

        <div className={styles.previewCandlesContentt}>
          <p>SEPTEMBER'S FIRST FRIDAY FLAME</p>
          <p>GHOST PUMPKIN</p>
          <p>
            Named for the snowy white variant of the pumpkin, Ghost Pumpkin is
            spicy and sweet with notes of bergamot, fresh cardamom, whipped
            pumpkin, and vanilla bean, but features a subtle floral edge with
            notes of sweet lavender.
          </p>
          <span>SHOP NOW</span>
        </div>
      </div>
    </>
  );
};

export default Home;
