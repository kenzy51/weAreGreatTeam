import styles from "./style.module.scss"
export const MainPage = () => {
  return (
   <div className="min-h-screen bg-slate-800">
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <h2 className={styles.logo}>Logo</h2>
        <ul className={styles.menu}>
          <li className={styles.links}><a href="" className={styles.menu_link}>Home</a></li>
          <li className={styles.links}><a href="" className={styles.menu_link}>About</a></li>
          <li className={styles.links}><a href="" className={styles.menu_link}>Features</a></li>
          <li className={styles.links}><a href="" className={styles.menu_link}>Contact</a></li>
        </ul>
        <img src="./images/cart.png"/>
      </nav>
</div>
      <div className={styles.main}>
        <h1 className={styles.main_title}>Welcome to <span>Main Page</span></h1>
      </div>

      <footer className="mt-64"> 
        <div className="  p-10 text-white bg-orange-800 flex justify-center">
          <div className="max-w-7xl mx-auto">
            <h1 className="">We Are Great Team</h1>
          </div>
        </div>
      </footer>
    
</div> 
  )   ;
};