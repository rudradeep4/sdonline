import {
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  Divider
} from "@chakra-ui/react";
import { Formik, Field } from "formik";


export default function Form({ subject, setAge, setSex, setView }) {

    return (
        <Formik
            initialValues={{
                subject: subject,
                age: "",
                sex: ""
            }}
            
            onSubmit={(values) => {
                setAge(parseInt(values.age))
                setSex(values.sex)
                setView('instructions')
            }}
        >
            {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                <Stat>
                    <StatLabel fontSize={'xl'} fontWeight={'bold'}>Subject</StatLabel>
                    <StatNumber fontSize={'xl'}># {subject}</StatNumber>
                </Stat>

                <Divider />

                <FormControl isRequired>
                    <FormLabel>Age</FormLabel>
                    <Field
                    as={Input}
                    id="age"
                    name="age"
                    type="age"
                    />
                </FormControl>

                <FormControl pb={8} isRequired>
                    <FormLabel>Sex</FormLabel>
                    <HStack>
                        <label>
                        <Field type="radio" name="sex" value="m" />
                            M
                        </label>
                        <label>
                        <Field type="radio" name="sex" value="f" />
                            F
                        </label>
                    </HStack>
                </FormControl>

                <Button type="submit" bg='#ffffff' textColor='#000000' width="full">
                    Submit
                </Button>
                </VStack>
            </form>
            )}
        </Formik>
    )
    }