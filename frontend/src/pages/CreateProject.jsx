import { Button, Col, Flex, Row } from "antd";
import { useCreateProject } from "../hooks/apis/mutations/useCreateProject"


export const CreateProject = ()=>{
    const { createProjectMutation } = useCreateProject();

    async function handleCreateProject(){
        console.log("Going to trigger the api");

        try {
            
            await createProjectMutation();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    return(
        <Row>
            <Col span ={24}>
               <Flex justify="center" align="center">
                   <Button
                      type="primary"
                      onClick={handleCreateProject}
                   >
                     Create Playground

                   </Button>

               </Flex>
            
            </Col>



        </Row>
    )

}