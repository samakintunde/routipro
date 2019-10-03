package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"github.com/gin-contrib/cors"
	"net/http"
	"os"
	"strings"
)

func main() {
	gin.SetMode(gin.ReleaseMode)
	PORT := "3020"
	if os.Getenv("PORT") != "" {
		PORT = os.Getenv("PORT")
	}
	r := gin.Default()
	r.Use(cors.Default())
	r.GET("/*url", func(c *gin.Context) {
		path := c.Request.RequestURI
		path = strings.Replace(path, "/", "", 1)
		resp, err := http.Get(path)
		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"error": err,
			})
			return
		}

		if strings.Contains(resp.Header.Get("Content-Type"), "application/json") {
			details, _ := ioutil.ReadAll(resp.Body)
			//c.JSON(resp.StatusCode, string(details))
			c.Data(resp.StatusCode, "application/json", details)
			return
		} else {
			bodyContent, _ := ioutil.ReadAll(resp.Body)
			c.Data(resp.StatusCode, "text/plain; charset=utf-8", bodyContent)
		}
	})
	fmt.Println("Server Started")
	r.Run(fmt.Sprintf("127.0.0.1:%s", PORT))
}