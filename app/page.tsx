import WeeklyMenu from "./components/WeeklyMenu";
import styled from "styled-components";

const Page = styled.div`min-height:100vh; background: #f8fafc; padding:16px 16px 80px;`;
const Container = styled.div`max-width: 420px; margin: 0 auto;`;
const SectionCard = styled.div`background:white; border-radius:12px; box-shadow:0 8px 20px rgba(2,6,23,0.06); padding:24px; margin-bottom:16px;`;
const Heading = styled.h1`font-size: 24px; font-weight: 700; margin-bottom: 24px; color: ${(p)=>p.theme.colors.text};`;
const SmallTitle = styled.h2`font-size:16px; font-weight:600; margin-bottom:12px; color:${(p)=>p.theme.colors.text};`;
const Row = styled.div`display:flex; align-items:center; justify-content:space-between; padding:12px; border-radius:8px;`;

const Avatar = styled.div<{variant?:string}>`
  width:40px; height:40px; border-radius:9999px; display:flex; align-items:center; justify-content:center; background: ${(p)=> p.variant === 'green' ? '#bbf7d0' : p.variant === 'yellow' ? '#fef3c7' : '#c7d2fe'};
`;
const SummaryGrid = styled.div`display:flex; gap:8px;`;
const SummaryBox = styled.div<{bg?:string;color?:string}>`
  flex:1; background:${(p)=>p.bg || 'transparent'}; padding:12px; border-radius:8px; text-align:center;
`;

export default function Home() {
  return (
    <Page>
      <Container>
        <Heading>Innehåll</Heading>

        <SectionCard>
          <SmallTitle>Kylskåpet</SmallTitle>
          <div style={{display:'grid', gap:12}}>
            <Row style={{background:'#eff6ff'}}>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <Avatar style={{background:'#bfdbfe'}}>🥛</Avatar>
                <div>
                  <div style={{fontWeight:600}}>Mjölk</div>
                  <div style={{fontSize:13}}>Utgår: 2026-01-28</div>
                </div>
              </div>
              <div style={{fontSize:12,color:'#2563eb', fontWeight:600}}>7 dagar</div>
            </Row>

            <Row style={{background:'#f0fdf4'}}>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <Avatar style={{background:'#bbf7d0'}}>🧀</Avatar>
                <div>
                  <div style={{fontWeight:600}}>Ost</div>
                  <div style={{fontSize:13}}>Utgår: 2026-02-10</div>
                </div>
              </div>
              <div style={{fontSize:12,color:'#16a34a', fontWeight:600}}>20 dagar</div>
            </Row>

            <Row style={{background:'#fffbeb'}}>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <Avatar style={{background:'#fef3c7'}}>🥚</Avatar>
                <div>
                  <div style={{fontWeight:600}}>Ägg</div>
                  <div style={{fontSize:13}}>Utgår: 2026-01-25</div>
                </div>
              </div>
              <div style={{fontSize:12,color:'#d97706', fontWeight:600}}>4 dagar</div>
            </Row>
          </div>
        </SectionCard>

        <SectionCard>
          <SmallTitle>Sammanfattning</SmallTitle>
          <p style={{marginBottom:16}}>Du har 3 produkter i kylskåpet. 1 produkt utgår snart.</p>
          <SummaryGrid>
            <SummaryBox bg="#dcfce7" color="#16a34a"><div style={{fontSize:20,fontWeight:700,color:'#16a34a'}}>2</div><div style={{fontSize:12}}>Färska</div></SummaryBox>
            <SummaryBox bg="#fffbeb" color="#d97706"><div style={{fontSize:20,fontWeight:700,color:'#d97706'}}>1</div><div style={{fontSize:12}}>Utgår snart</div></SummaryBox>
            <SummaryBox bg="#fee2e2" color="#dc2626"><div style={{fontSize:20,fontWeight:700,color:'#dc2626'}}>0</div><div style={{fontSize:12}}>Utgångna</div></SummaryBox>
          </SummaryGrid>
        </SectionCard>

        {/* Recipe suggestion */}
        <WeeklyMenu />
      </Container>
    </Page>
  );
}
