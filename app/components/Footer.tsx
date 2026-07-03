import Container from "./Container";


export default function Footer(){
    return (
        <footer className="border-t border-surface mt-12 bg-ink">
          <Container>
            <p className="py-6 text-muted text-sm">Movie data from TMDB. Built by Sam.</p>
          </Container>
        </footer>
    );
}