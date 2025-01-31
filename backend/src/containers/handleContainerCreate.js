import Docker from 'dockerode';


const docker = new Docker();

export const handleContainerCreate = async(projectId, socket)=>{
    console.log("Project id received after connection", projectId);docker

    try {
        const container = await docker.createContainer({
            Image: 'sandbox',  // name given to the image while building
            Tty: true,
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            Cmd: ['/bin/bash'],
            User: 'sandbox',

            HostConfig: {
                Binds: [
                    `${process.cwd()}/projects/${projectId}:/home/sandbox/project` // mounting the project directory to the container
                ],
                PortBindings: {
                    '5173/tcp': [
                        {
                            HostPort: "0"
                        }
                    ]
                },
                ExposedPorts: {
                    '5173/tcp': {}
                },
                Env:["Host=0.0.0.0"]
            }
            
        });

        console.log("Container created", container.id);
        await container.start();
        console.log("Container started");

    } catch (error) {
        console.log("Error in creating container", error); 
    }



}