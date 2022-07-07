# Front End

### Member

-   송가람
-   한지선

## 폴더 구조

```shell
.
└── front
    ├── public
    └── src
        ├── assets
        │    ├── images
        │    └── svgs
        ├── components
        │   ├── button
        │   ├── header
        │   ├── input
        │   ├── layout
        │   ├── loader
        │   └── modal
        ├── hooks
        ├── libs
        ├── pages
        │   ├── community
        │   ├── home
        │   ├── intro
        │   ├── kakaoMap
        │   ├── landmark
        │   ├── login
        │   ├── mypage
        │   ├── recommend
        │   └── register
        ├── queries
        ├── states
        └── styles
            └── base
```

### pages

총 9개의 폴더가 존재합니다.

**community**:  
커뮤니티 게시글을 머리글로 정렬할 수 있으며, 페이지네이션을 이용해 구현되었습니다. 글쓰기는 수정, 삭제가 가능하며 에디터를 이용해 작성할 수 있습니다.

**home**:
home 화면에 접속해 검색어로 검색을 하거나 이미지로 검색하기를 누르면 사진 파일을 선택할 수 있고, 로딩이 끝나면 검색결과를 확인 할 수 있습니다.

**intro**:
서비스를 소개하는 페이지 입니다.

**kakaoMap**
카카오 맵 api를 이용해 랜드마크의 위치를 알 수 있고, 클릭하면 카카오맵으로 연결됩니다.

**landmark**
사랜드마크의 상세정보와 평점을 볼 수 있습니다. 랜드마크 인증한 유저가 리뷰와 평점을 작성할 수 있습니다.

**login**
유저정보를 입력해 로그인을 할 수 있습니다.

**mypage**
회원 정보, 수정이 가능하며 Mymap에서는 스탬프 10개 단위로 레벨을 올려줍니다. <br> 
(lv.1 감귤 > lv.2 도야지 > lv.3 야자수 > lv.4 한라산 > lv.5 동백꽃 > lv.6 돌하르방) <br>
이미지 인증 버튼을 누르고 파일을 선택하면 Mystamp에는 인증한 랜드마크 하나당 스탬프를 찍어줍니다.

**recommend**
전체 제주 랜드마크를 보여주며, 좋아요순, 리뷰순, 리뷰평점순으로 정렬할 수 있습니다.

**register**
회원가입이 가능합니다.


## 적용된 기술 및 기능

-   recoil 사용
-   react query 사용
-   styled-components 사용

