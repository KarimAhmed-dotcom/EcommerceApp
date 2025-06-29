import styles from './Spinner.module.css';function Spinner({size='full'}){
    return(
        <div
        
            style={{
                width:size === 'full'?"100vw" :size,
                height:size === 'full'?"100vh" :size, 
            }}
            className={styles.loaderContainer}
        >

             <span className={styles.loader}></span>
        </div>
       

    )
}
 
export default Spinner