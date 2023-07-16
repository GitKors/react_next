import Link from "next/link"
import Head from "next/head"
export default function Error () {
    return (
        <>
            <Head>
                <title>УПС...</title>
            </Head>
            <h1 style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold', color: 'deeppink' }}>УПС, Такой страницы нет</h1>
            <img src="/CAT.svg" alt="OOops" style={{ width: '300px', height: '200px', display: 'block', margin: '0 auto' }} />

            <div style={{ textAlign: 'center' }}>
                <Link href="/" style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    backgroundColor: 'deeppink',
                    color: 'white',
                    borderRadius: '5px',
                    textDecoration: 'none',
                    transition: 'background-color 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    }}>
                Главная
                </Link>
            </div>
        </>
    )
}