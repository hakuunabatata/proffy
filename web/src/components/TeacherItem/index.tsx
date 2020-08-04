import React from 'react'
import zipzorpIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'


function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img
                    src="https://p2.trrsf.com/image/fget/cf/1200/1200/filters:quality(85)/images.terra.com/2020/05/03/3315670-fausto-silva-apareceu-com-mulher-e-filho-650x488-2.jpg"
                    alt="Teacher Fausto" />
                <div>
                    <strong>Teacher Fausto</strong>
                    <span>Programação</span>
                </div>
            </header>
            <p>
                Fausto Corrêa da Silva (Porto Ferreira, 2 de maio de 1950), popularmente conhecido como Faustão,
                    <br /> <br />
                    é um apresentador de televisão, radialista e repórter e casualmente ator brasileiro. Célebre por apresentar o programa de auditório Domingão do Faustão, da Rede Globo, desde 1989.
                    </p>

            <footer>
                <p>
                    Preço/hora
                            <strong>R$ 1000,00</strong>
                </p>
                <button type="button">
                    <img src={zipzorpIcon} alt="Zipzorp" />
                            Entrar em Contato
                        </button>
            </footer>
        </article>
    )
}
export default TeacherItem