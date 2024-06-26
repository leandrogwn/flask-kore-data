import logo from './../assets/kore-data-logo-versao-original.svg'

function Home() {
    return (
        <div>
            <div className='logo-home'>
            <img src={logo} alt='Logotipo da Kore Data'  width={500}/>
            </div>
            <div className='slogan'>
            <h1>Conectamos dados para gerar resultados</h1>
            </div>
        </div>
    )
}

export default Home;