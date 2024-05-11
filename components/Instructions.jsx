import {
  IconButton,
  VStack,
  Box,
  Text,
  Alert,
  AlertIcon,
  AlertDescription
} from "@chakra-ui/react";
import { useState } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons"


export default function Instructions({ content, kind, setView }) {

    const [num, setNum] = useState(0)

    return (
        <VStack w='700px' spacing={16}>
            {
                _.startsWith(kind, 'break')
                ?
                <Alert
                    status='info'
                    variant='solid'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                    >
                    <AlertIcon boxSize='20px' mr={0} mb={4} />
                    <AlertDescription maxWidth='md'>{content[0][kind][num]}</AlertDescription>
                </Alert>
                :
                <Box h={500}>
                    <Text whiteSpace={'break-spaces'}>{content[0][kind][num]}</Text>
                </Box>    
            }
            {
                (kind != 'end') &&
                <IconButton
                    icon={<ArrowForwardIcon />}  
                    onClick={
                        (num == Object.values(content[0][kind]).length-1) 
                        ? () => {setView('trial')}
                        : () => setNum(num+1)
                    }
                    bg='#ffffff'
                    textColor='#000000'
                    width='100px'
                />
            }
        </VStack>
    )
}