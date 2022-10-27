

const func = async () => {
    const versions = await window.versions;
    console.log(versions)
    const information = document.getElementById('info');
    information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

    
    document.querySelector('button').addEventListener('click',async (el)=>{
        el.target.innerHTML = 'Starting'
        const response = await window.versions.start()||'error';
        el.target.innerHTML = response
    })
}
func()