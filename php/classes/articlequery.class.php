<?php

class Articlequery extends PDOHelper {	

  protected $user_info = array("user_id" => 1);
  protected $menu_name = "menu-main-menu";
 

    public function saveArticle($page_data) {

    $page_data[":user_id"] = $this->user_info["user_id"];

    $sql = "INSERT INTO pages (title, content, user_id) VALUES (:title, :content, :user_id)";

    return $this->query($sql, $page_data);


  }

  public function saveUrl($url_data){

    $sql = "SELECT pid FROM pages ORDER BY created DESC LIMIT 1";

    $new_pid = $this->query($sql);

    $new_pid = $new_pid[0]["pid"];

    $url_path = $url_data[":path"];

    unset($url_data[":path"]);

    //insert new page url alias
    $sql2 = "INSERT INTO url_alias (path, pid) VALUES (:path, :pid)";

    $url_data = array(
      ":path" => $url_path,
      ":pid" => $new_pid
      );

    return $this->query($sql2, $url_data);
    $url_data[":path"] = $this->addMenuLink($url_path);

  }

  public function addMenuLink($menu_data){

      $menu_data["menu-main-menu"] = $this->menu;
      //Kolla om menu-link-id är NULL eller inte
     // $menu_data["mlid"] = (isset($menu_data["mlid"]) ? $menu_data["mlid"] : null);
    
      //$menu_data["parent"] = (isset($menu_data["plid"]) ? $menu_data["plid"] : null);
    


    
      $sql = "INSERT INTO menu_links (title, path, menu, plid, weight) VALUES (:title, :path, :menu_name, :plid, :weight)";

      $menu_data = array(
        ":title" => $menu_data["title"],
        ":path" => $url_path,
        ":menu_name" => $menu_data["parent"]["menu"],
        ":plid" => $menu_data["parent"]["mlid"],
        ":weight" => $menu_data["weight"],
      );

      return $this->query($sql, $menu_data);
    }
  
  
   // return true;
  


  public function getMenuNames() {
    $sql = "SELECT * FROM menus";
    return $this->query($sql);
  }


  public function getMenuLinks($menu_name) {
    $menu_name = "menu-main-menu";
    $menu_name = array(":menu_name" => $this->menu_name);
    $sql = "SELECT * FROM menu_links WHERE menu = :menu_name";
    
    return $this->query($sql, $menu_name);
  }
}




