# 제주감수꽝

![logo](./wiki/img/logo.svg) <br>
-   제주 랜드마크 추천 및 공유 AI 웹 서비스


## 프로젝트 구성 안내

## 1. 프로젝트 소개

### 핵심 서비스
 
- 제주도의 관광 랜드마크를 지도 위에 표시하여 사용자의 접근성을 용이하게 하고, 클릭 시 관광 랜드마크와 관련된 정보를 사용자에게 제공
- 제주도와 관련된 여러 이미지들을 업로드 시, 서비스에 탑재한 인공지능이 이미지를 분석하여 관광 랜드마크를 파악하여 사용자에게 알려줌
- 실제 제주도를 관광하고 있는 관광객들이 이미지를 업로드 시, 해당 관광 랜드마크에 해당하는 스탬프를 제공하는 Gamification 기능을 제공, 해당 스탬프를 소유한 사용자가 해당 관광 랜드마크에 대한 리뷰를 작성할 수 있도록 함

### 기획 의도
- 맛집과 비교하였을 때, 관광지는 지도를 통해 접근하는 리뷰 사이트 등에서 리뷰 수가 적어 사용자들이 리뷰를 통한 간단한 관광 계획 설계 등에 어려움이 있을 것으로 파악
- 따라서 관광과 관련된 리뷰를 제공하는 서비스를 제작하여 **"간단한"** 관광 계획 설계를 바라는 사용자들의 수요를 충족시키기 위해 서비스를 제작하기로 하였음

### 목표
- 패키지보다는 자유여행을 선호하는 것에 주목하여 더 다양한 관광 상품이 고객과 만나도록 함
- 관광지를 직접 경험해본 유저만이 작성한 리뷰를 제공하여 자신의 취향에 맞춰 다양한 여행을 해보고 싶은 수요를 충족시키는 서비스 제공

### 기술 스택

-   Python
-   Tensorflow
-   javascript
-   react
-   mongoDB

### 모델 및 데이터셋 

#### [AIHub-랜드마크 이미지](https://aihub.or.kr/aidata/8009)
국내 랜드마크 이미지

#### [visitjeju.net](https://www.visitjeju.net/kr))
여행지 목록 중, 좋아요순•리뷰순 기준으로 정렬 후 선정

####  [categoryList.csv](./back/public/categoryList.csv)
랜드마크 목록

#### 인기 랜드마크지만 AIHub 데이터셋에 없는 랜드마크 일부는 크롤링 진행
#### 데이터셋의 불균형을 해결하기 위해 일부 크롤링 진행
#### 랜드마크 수 : 54개 (약 10,000장)

## 2. 프로젝트 기능 설명
### User MVP
- 관광 랜드마크 이미지를 인증 성공 시, 개인 페이지에 해당 관광 랜드마크에 해당되는 스탬프를 획득
- 스탬프의 갯수에 따라 레벨 등업 기능 (gamification과 관련해서 지속적인 서비스 이용과 재미와 흥미를 유도)
- 회원일 시, 리뷰나 게시판 등을 사용하여 타 사용자와 소통 가능

### Review MVP
- 유저의 스탬프와 연동하여 랜드마크를 다녀온 사람만 리뷰를 작성하도록 했기 때문에, 검증된 후기를 볼 수 있고 혹시 있을 별점 테러를 방지할 수 있음

### Tour MVP
- 이미지를 업로드하면, 그 이미지를 인공지능이 인식하여 제주도의 어느 관광 랜드마크인지 판단하여 사용자에게 그곳의 상세내용과 리뷰 등을 제공함

### Community MVP
- 자유게시판의 성격을 가진 게시판에서 사용자들이 제주도 관광에 대한 질문 및 팁들을 공유할 수 있게 함
- 지속적인 서비스 이용 유도, 자유롭게 묻고 마음맞는 여행메이트를 구할 수 있음


## 3. 프로젝트 구성도

### 서비스 구조도

![service architecture](./wiki/img/serviceArchitecture.png)

### Home
![home스크린샷](./wiki/img/home.png)
home 화면에 접속해 검색어로 검색을 하거나 이미지로 검색하기를 누르면 사진 파일을 선택할 수 있고, 로딩이 끝나면 검색결과를 확인 할 수 있습니다.

### 추천 랜드마크 목록
![landmarkList](./wiki/img/landmarkList.png) <br>
추천 랜드마크의 목록을 보여주며, 좋아요순, 리뷰순, 리뷰평점순으로 정렬할 수 있습니다.

### 랜드마크 상세정보 페이지
![landmarkDetail](./wiki/img/landmarkDetail.png) <br>
랜드마크의 상세정보와 평점을 볼 수 있습니다.

### Review
![review](./wiki/img/Review.png) <br>
랜드마크 인증한 유저가 리뷰와 평점을 작성할 수 있습니다.

### Community
![community](wiki/img/community.png)
커뮤니티 게시글을 머리글로 정렬할 수 있으며, 페이지네이션을 이용해 구현되었습니다. 글쓰기는 수정, 삭제가 가능하며 에디터를 이용해 작성할 수 있습니다.

### Map
![map](wiki/img/map.png)  <br>
카카오 맵 api를 이용해 랜드마크의 위치를 알 수 있고, 클릭하면 카카오맵으로 연결됩니다.

### Mypage
![mypage](wiki/img/mypage.png)
회원 정보, 수정이 가능하며 Mymap에서는 스탬프 10개 단위로 레벨을 올려줍니다. (lv.1 감귤 > lv.2 도야지 > lv.3 야자수 > lv.4 한라산 > lv.5 동백꽃 > lv.6 돌하르방) <br>
이미지 인증 버튼을 누르고 파일을 선택하면 Mystamp에는 인증한 랜드마크 하나당 스탬프를 찍어줍니다. <br>

### Service Introduce
![serviceIntroduce1](wiki/img/serviceIntroduce1.png) <br>
![serviceIntroduce2](wiki/img/serviceIntroduce2.png) <br>
![serviceIntroduce3](wiki/img/serviceIntroduce3.png) <br>
서비스를 소개하는 페이지 입니다.

## 4. 프로젝트 팀원

### 역할 분담

| 이름   | 담당 업무                     |
| ------ | ----------------------------- |
| 김보현 | 팀장 / AI 개발               |
| 김효진 | AI 개발 /**중간 발표**     |
| 김기동 | 백엔드 개발               |
| 박정미 | 백엔드 개발/**최종 발표** |
| 한지선 | 프론트엔드 개발       |
| 송가람 | 프론트엔드 개발              |

### 멤버별 responsibility

1. 팀장

-   기획 단계: 구체적인 설계와 지표에 따른 프로젝트 제안서, 개발 문서 작성
-   개발 단계: 팀원간의 일정 등 조율 
-   수정 단계: 기획, 스크럼 진행, 코치님 피드백 반영해서 수정, 발표 준비

2. 프론트엔드 담당

-   기획 단계: 큰 주제에서 문제 해결 아이디어 도출, 데이터 수집, 와이어프레임 작성
-   개발 단계: 와이어프레임을 기반으로 구현, 데이터 처리 및 시각화 담당, UI 디자인 완성
-   수정 단계: 피드백 반영해서 프론트 디자인 수정

3.  백엔드 담당

[Backend README](/back/README.md)  

-   기획 단계: 기획 데이터 분석을 통해 해결하고자 하는 문제를 정의
-   개발 단계: 웹 서버 사용자가 직접 백엔드에 저장할수 있는 기능 구현, 데이터 베이스 구축 및 API 활용
-   수정 단계: 코치님 피드백 반영해서 분석

4. AI 담당

[Ai README](/ai/README.md)

-   데이터 선정 단계: 프로젝트 기획에 맞는 데이터 선정
-   데이터 수집 전처리 단계 : 데이터셋의 불균형을 해결하기 위해 크롤링 진행

## 5. AI 모델 학습

### Train/Test/Validation split   
* ```splitfolders```라이브러리를 이용해 ```8:1:1``` 비율로 split   
* split 코드 - [trainTestSplitImage.py](./utils/trainTestSplitImage.py)   
<br>

### Data Augmentation
* 데이터 특성상 유사도가 높은 이미지들이 많아 ```Tensorflow```의 ```ImageDataGenerator```를 이용해 test 이미지를 제외한 나머지 이미지들을 증강
* ImageDataGenerator config
    ```python
    ImageDataGenerator(rescale=1./255,
                            width_shift_range=0.1,
                            height_shift_range=0.1,
                            shear_range=0.2,
                            zoom_range=-0.3,
                            horizontal_flip=False,
                            vertical_flip=False,
                            brightness_range=[0.7, 1.3],
                            fill_mode='nearest'
                            )
    ```
<br>

### ResNet101 + custom layer   
다양한 모델 테스트 과정과 [ILSVRC](https://www.image-net.org/challenges/LSVRC/), [DACORN-랜드마크 분류 AI 경진대회](https://dacon.io/competitions/official/235585/overview/description)의 우승 경력을 고려하여 ResNet101 모델을 제주도 랜드마크 이미지 분류 학습을 위한 모델로 선정
* ResNet   
ResNet은 기본적으로 VGG-19의 구조를 뼈대로 함. 컨볼루션 층들을 추가해 깊게 만든 후, shortcut들을 추가한 구조   
![resnet1](wiki/img/resnet1.png)   
아래 표는 18층, 34층, 50층, 101층, 152층의 ResNet의 구조 요약   
![resnet2](wiki/img/resnet2.png) <br/> 
ResNet은 [ILSVRC](https://www.image-net.org/challenges/LSVRC/)(ImageNet Large Scale Visual Recognition Challenge) 2015에서 우승한 모델로 이미지 분류 인식 오류율 3.8%로 1등을 차지한 모델   
    
논문 : [Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385)

<br>

## 9. 버전
- 1.0.0



