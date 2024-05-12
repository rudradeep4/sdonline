import {
    Box,
    Spinner,
    Center
} from "@chakra-ui/react";
import { useState } from "react";
var _ = require('lodash')
import ReactPlayer from "react-player";


export default function Trial({ trial, setView }) {

    const [spinner, setSpinner] = useState(true)

    return (
        <Box>
            <Center>
                {spinner && <Spinner pos={'absolute'} />}
                <ReactPlayer
                    position={'absolute'}
                    url={trial.source}
                    width='100%'
                    height='100%'
                    controls={false} 
                    muted={false} 
                    playing={true}
                    onReady={() => setSpinner(false)}
                    onEnded={() => setView('task')}
                />
            </Center>
    </Box>
    )
}