import {
    VStack,
    Button,
    Text,
    Slider,
    SliderMark,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Box
} from "@chakra-ui/react";
import { useState } from "react";
import fetch from 'isomorphic-unfetch';
var _ = require('lodash')
import { ArrowForwardIcon } from "@chakra-ui/icons";


export default function Task({ trial, count, setCount, setView, subject, age, sex, order, nTrials, nDeviant, nPractice }) {

    const [sliderResp, setSliderResp] = useState()

    const handleClick = async () => {
        let response = {
            "trialId": trial.video_path,
            "subject": subject,
            "age": age,
            "sex": sex,
            "order": order,
            "count": count,
            "response": sliderResp ? sliderResp : 5
        }
        const res = await fetch('/api/trials', {
            method: 'POST',
            body: JSON.stringify(response)
        })

        if (_.includes([nPractice, nPractice+(nDeviant), nPractice+(nDeviant*2), nPractice+(nDeviant*3), nTrials], count+1)) {
            setView('instructions')
        } else {
            setView('trial')
        }
        setCount(count+1)
    }

    return (
        <Box>
            <VStack spacing={8}>
                <Text fontSize={'xl'}>A quel point êtes-vous d’accord avec le fait que cette interaction est authentique ?</Text>
                <Slider defaultValue={5} min={1} max={10} step={1} onChangeEnd={(value) => setSliderResp(value)}>
                    <SliderMark value={1} mt={2} ml={-20}>Pas du tout<br />d’accord</SliderMark>
                    <SliderMark value={2} mt={2}>2</SliderMark>
                    <SliderMark value={3} mt={2}>3</SliderMark>
                    <SliderMark value={4} mt={2}>4</SliderMark>
                    <SliderMark value={5} mt={2}>5</SliderMark>
                    <SliderMark value={6} mt={2}>6</SliderMark>
                    <SliderMark value={7} mt={2}>7</SliderMark>
                    <SliderMark value={8} mt={2}>8</SliderMark>
                    <SliderMark value={9} mt={2}>9</SliderMark>
                    <SliderMark value={10} mt={2}>Complètement d’accord</SliderMark>
                    <SliderTrack bg='white'>
                    <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
                <Button
                    mt={8}
                    rightIcon={<ArrowForwardIcon />} 
                    onClick={handleClick}
                    bg='#ffffff'
                    textColor='#000000'
                >
                    Confirm
                </Button>
            </VStack>
        </Box>
    )
}