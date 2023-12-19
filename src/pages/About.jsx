import '../styles/About.css'

export default function About() {
    
    return (
        <>
            <div className='image margin-top-extra'>
                <img src={require('../images/Day_Care_Unova.png')} alt='daycare' height={180} width={320} />
            </div>
            <div>
                <p className='margin-top p-margins'>The lovely Pokemon Day Care has been running for many years.</p>
                <p className='margin-top p-margins'>Both Grant and Martha have enjoyed every year they have
                spent servicing the community through caring for
                Pokemon.
                </p>
            </div>
            <div className='image'>
                <img className='margin-top' src={require('../images/oldcouple-gen3.png')} alt='old couple' height={160} width={160} />
            </div>
            <div>
                <p className='margin-top p-margins'>With their strong expertise in the field of Pokemon care,
                there is no Pokemon that is too tough for them.
                </p>
                <p className='margin-top p-margins'>Regardless of the service you choose, be assured that you have
                made the right choice!
                </p>
            </div>
        </>
    )
}