//nut nhan va led 1
int nut_nhan_1 = 40; // định nghĩa chân số 0 là button
int led_1 = 30,tl1=0; // khai báo led và biến
int luu_nut_1;// biến lưu các trạng thái nút nhấn

//nut nhan va led 2
int nut_nhan_2 = 41; // định nghĩa chân số 0 là button
int led_2 = 31,tl2=0; // khai báo led và biến
int luu_nut_2;// biến lưu các trạng thái nút nhấn


// viết hàm chống dội nut
boolean chong_doi(int nut_chong_doi)
{
  int sta =!digitalRead(nut_chong_doi);
  delay(10);
  return sta;
}


// khởi tạo
void setup()
{
    Serial.begin(9600);

    //nut nhan va led 1
    pinMode(nut_nhan_1,INPUT); 
    pinMode(led_1,OUTPUT);

    //nut nhan va led 2
    pinMode(nut_nhan_2,INPUT); 
    pinMode(led_2,OUTPUT);

    // che do ban dau cua led
    digitalWrite(led_1, HIGH); 
    digitalWrite(led_2, HIGH);     
}
void loop() // vong lap
{
  int buttonState_1 = digitalRead(nut_nhan_1);
  //Serial.println(buttonState);
  luu_nut_1 = chong_doi(nut_nhan_1);
  if(luu_nut_1==true)
  {
    {
      tl1=!tl1;// đảo trạng thái
    }
    while(luu_nut_1==true){luu_nut_1=chong_doi(nut_nhan_1);}
  }
  if(tl1==1)
      {
     digitalWrite(led_1,HIGH);
       }
      else
            {
           digitalWrite(led_1,LOW);
             }
  Serial.println(tl1);


//nut nhan va led 2
  int buttonState_2 = digitalRead(nut_nhan_2);
  //Serial.println(buttonState);
  luu_nut_2 = chong_doi(nut_nhan_2);
  if(luu_nut_2==true)
  {
    {
      tl2=!tl2;// đảo trạng thái
    }
    while(luu_nut_2==true){luu_nut_2=chong_doi(nut_nhan_2);}
  }
  if(tl2==1)
      {
     digitalWrite(led_2,HIGH);
      }
      else
            {
           digitalWrite(led_2,LOW);
             }
  Serial.println(tl2);
}