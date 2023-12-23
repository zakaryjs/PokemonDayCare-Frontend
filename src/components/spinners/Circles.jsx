import { Circles } from 'react-loader-spinner';

// circle spinner component
// used when loading account portal, pokemon and appointments

export default function LoadingCircles() {

    return (
        <Circles
                height="80"
                width="80"
                color="#93F7A7"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
    )
}