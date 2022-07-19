---
sidebar: auto
---
# Maven

1. 安装jar到本地的maven仓库

   ```shell
   # 在eclipse或idea中执行命令可以省略 mvn
   install:install-file -Dfile=F:\files\tanzj\test.jar -DgroupId=com.tanzj -DartifactId=testJar -Dversion=1.0 -Dpackaging=Jar
   ```

2. maven打包${paroject.basedir}下的jar包没有引入

   https://blog.csdn.net/h2604396739/article/details/97623552

3. 插件

   - maven-antrun-plugin 

     ```xml
     <!--无密码，使用key-->
     <properties>
         <server.host>45.40.203.18</server.host>
         <server.username>root</server.username>
         <server.tomcat.path>/var/apache-tomcat-9.0.27/</server.tomcat.path>
         <keyfile.path>${project.basedir}/../gximKey</keyfile.path>
     </properties>
      <!--build 下-->
     <plugin>
         <groupId>org.apache.maven.plugins</groupId>
         <artifactId>maven-antrun-plugin</artifactId>
         <version>1.8</version>
         <executions>
             <execution>
                 <id>scp-to-remote</id>
                 <phase>package</phase>
                 <goals>
                     <goal>run</goal>
                 </goals>
                 <configuration>
                     <target>
                         <scp
                                 localFile="${project.basedir}/target/${project.build.finalName}.war"
                                 remoteToFile="${server.username}@${server.host}:${server.tomcat.path}/${project.build.finalName}.war"
                                 verbose="true"
                                 keyfile="${keyfile.path}" passphrase=""
                                 trust="true">
                         </scp>
                         <sshexec host="${server.host}" username="${server.username}" trust="true"
                                     keyfile="${keyfile.path}" failonerror="true"
                                     command="ls"/>
     
                     </target>
                 </configuration>
             </execution>
         </executions>
         <!-- libraries for scp impl antrun doesn't use os's scp -->
         <dependencies>
             <dependency>
                 <groupId>com.jcraft</groupId>
                 <artifactId>jsch</artifactId>
                 <version>0.1.53</version>
             </dependency>
             <dependency>
                 <groupId>ant</groupId>
                 <artifactId>ant-jsch</artifactId>
                 <version>1.6.5</version>
             </dependency>
         </dependencies>
     </plugin>
     ```

     使用前配置：

        linux可以通过私钥登录或者直接使用密码登录；

     ```xml
     <!--使用密码-->
     <scp
                                             localFile="${project.basedir}/target/${project.build.finalName}.war"
                                             remoteToFile="${server.username}:${server.password}@${server.host}:${server.tomcat.path}/${project.build.finalName}.war"
                                             verbose="true"
                                             passphrase=""
                                             trust="true">
                                     </scp>
                                     <sshexec host="${server.host}" username="${server.username}" trust="true"
                                              password="${server.password}"
                                              failonerror="true"
                                              command="ls"/>
     ```

   4. maven 使用不同环境打包

      `只修改要切换的文件资源，过滤其它的文件`

      ```xml
      <build>
      	<resources>
              <resource>
                  <directory>src/main/resources</directory>
                  <filtering>true</filtering>
                  <includes>
                      <include>**/*.*</include>
                  </includes>
              </resource>
          </resources>
      </build>
      
      <!--切换环境-->
          <profiles>
              <profile>
                  <id>dev</id>
                  <properties>
                      <env.profile>dev</env.profile>
                  </properties>
                  <activation>
                      <activeByDefault>true</activeByDefault>
                  </activation>
              </profile>
              <profile>
                  <id>prod</id>
                  <properties>
                      <env.profile>prod</env.profile>
                  </properties>
              </profile>
          </profiles>
      
      <!--
        可在配置文件中使用${env.profile} 执行不同maven命令去更换配置
        mvn clean package -Dmaven.skip.test=true -P dev/prod
      -->
      ```

      