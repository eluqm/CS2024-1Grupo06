import styled from "styled-components";
import { Carousel, Btnsave, v } from "../../index";

export function HomeTemplate() {
  return (
    <Main>
      <Container>
        <Box>
          <Carousel />
        </Box>
        <Title>
          Bienvenido a Coin2Coin <br /> ✅
        </Title>
        <SubText>
          C2C nace por las pocas aplicaciones gratis que existen para
          controlar gastos e ingresos.
          <br />
          🔥Nace del curso de construcción de software en la universidad LA SALLE,
          <br /> MUCHAS GRACIAS POR APOYAR ESTE PROYECTO
        </SubText>
        <ContainerAutor>
          <div className="contentImg">
            <img src="https://i.postimg.cc/G22XFLKc/79915950-160225645209465-2784832961952874496-n.jpg" />
          </div>
          <div className="contentDescripcion">
            <b>Christian Rodriguez</b>
            <span>"Viviendo como se aprueba, al límite"</span>
          </div>
        </ContainerAutor>
        <ButtonContainer>
          <Btnsave url="https://wa.me/51930632044"
            titulo="Mandame un mensaje a WhatsApp"
            bgcolor="#BF94FF"
            icono={<v.iconoreact />}
          />
          <Btnsave url="https://www.instagram.com/lxrd_asde/"
            titulo="Mi Instagram"
            bgcolor="#fb37b7"
            icono={<v.iconocorona />}
          />
        </ButtonContainer>
      </Container>
    </Main>
  );
}
const Main = styled.main`
  min-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.bgtotal};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  
`;
const Container = styled.div`
  width: 75%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align:center;
  
`;
const Box = styled.div`
  width: 50%;
  height: 100%;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 40em) {
    min-height: 50vh;
  }
`;
const Title = styled.h2`
  font-size: ${(props) => props.theme.fontxxl};
  text-transform: capitalize;
  color: ${(props) => props.theme.text};
  align-self: flex-start;
  width: 80%;
  margin: 0 auto;

  @media (max-width: 64em) {
    width: 100%;
    text-align: center;
  }
  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontxl};
  }
  @media (max-width: 30em) {
    font-size: ${(props) => props.theme.fontlg};
  }
`;
const SubText = styled.p`
  font-size: ${(props) => props.theme.fontlg};
  color: #8e8c86;
  align-self: flex-start;
  width: 80%;
  margin: 1rem auto;
  font-weight: 400;

  @media (max-width: 64em) {
    width: 100%;
    text-align: center;
    font-size: ${(props) => props.theme.fontmd};
  }
  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontmd};
  }
  @media (max-width: 30em) {
    font-size: ${(props) => props.theme.fontsm};
  }
`;
const ContainerAutor = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  .contentImg {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      object-fit: contain;
    }
  }
  .contentDescripcion {
    display: flex;
    flex-direction: column;
    b{
      color: ${(props) => props.theme.text};
    }
    span {
      color: #8c8c8c;
    }
  }
`;
const ButtonContainer = styled.div`
  width: 80%;
  margin: 1rem auto;
  align-self: center;
  justify-content:center;
  display: flex;
  gap: 20px;
  @media (max-width: 64em) {
    width: 100%;
  }
`;
