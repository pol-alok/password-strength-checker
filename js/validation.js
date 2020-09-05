$(function () {

  /**
   * @return {number} with longest common substring
   */
  function LCSubStr(str1,str2,m,n) {
    const LCSuff = new Array(m+1).fill(0).map(() => new Array(n+1).fill(0));
    let result = 0;
    for (let i=0; i<=m; i++) {
      for (let j=0; j<=n; j++) {
        if (i === 0 || j === 0)
          LCSuff[i][j] = 0;
        else if (str1[i-1] === str2[j-1]) {
          LCSuff[i][j] = LCSuff[i-1][j-1] + 1;
          result = Math.max(result, LCSuff[i][j]);
        }
        else LCSuff[i][j] = 0;
      }
    }
    return result;
  }

  function isIncrOrDescNum(str,val) {
    let flag=false;
    if(val.match(/\d+/g)==null) {
      console.log("null h re baba!")
    } else {
      val.match(/\d+/g).forEach((val)=> {
        flag = flag || (LCSubStr(str,val,str.length,val.length)>2);
      });
    }
    console.log(flag+"  <=========");
    return flag;
  }

  function isIncrOrDescNum(str,val) {
    let flag=false;
    if(val.match(/\d+/g)==null) {
      console.log("null h re baba!")
    } else {
      val.match(/\d+/g).forEach((val)=> {
        flag = flag || (LCSubStr(str,val,str.length,val.length)>2);
      });
    }
    console.log(flag+"  <=========");
    return flag;
  }

  function isIncrOrDescAlpha(str,val) {
    let flag=false;
    if(val.match(/[a-zA-Z]+/g)==null) {
      console.log("null h re baba!")
    } else {
      val.match(/[a-zA-Z]+/g).forEach((val)=> {
        flag = flag || (LCSubStr(str,val,str.length,val.length)>2);
      });
    }
    console.log(flag+"  <=========");
    return flag;
  }
  // Adding the custom validation

  //For Increasing Sequence
  $.validator.addMethod(
      "incrNum",
      function (value, element) {
        return !isIncrOrDescNum("0123456789",value);
      },
      `<p class="text-danger small">opps! Increasing Number Sequence not allowed!</p>`
  );

  //For Decreasing Sequence
  $.validator.addMethod(
      "descNum",
      function (value, element) {
        return !isIncrOrDescNum("9876543210",value);
      },
      `<p class="text-danger small">opps! Decreasing Number Sequence not allowed!</p>`
  );

  $.validator.addMethod(
      "incrChar",
      function (value, element) {
        return !isIncrOrDescAlpha("abcdefghijklmnopqrstuvwxyz",value);
      },
      `<p class="text-danger small">opps! Increasing Alphabet Sequence not allowed!</p>`
  );

  $.validator.addMethod(
      "descChar",
      function (value, element) {
        return !isIncrOrDescAlpha("zyxwvutsrqponmlkjihgfedcba",value);
      },
      `<p class="text-danger small">opps! Decreasing Alphabet Sequence not allowed!</p>`
  );
  //For valid repeated character more than 3 character
  $.validator.addMethod(
      "repNumber",
      function (value, element) {
        return !value.match("(.)\\1{2,}");
      },
      `<p class="text-danger small">Please do not put repeated character!</p>`
  );

  $.validator.addMethod(
      "AtLeastOneLAC",
      function (value, element) {
        return value.match("(?=.*[a-z])");
      },
      `<p class="text-danger small">Password should contain at least 1 lowercase alphabetical character!</p>`
  );

  $.validator.addMethod(
      "AtLeastOneUAC",
      function (value, element) {
        return value.match("(?=.*[A-Z])");
      },
      `<p class="text-danger small">Password should contain at least 1 uppercase alphabetical character!</p>`
  );

  $.validator.addMethod(
      "AtLeastOneNC",
      function (value, element) {
        return value.match("(?=.*[0-9])");
      },
      `<p class="text-danger small">Password should contain at least 1 numeric character!</p>`
  );

  $.validator.addMethod(
      "AtLeastOneSC",
      function (value, element) {
        return value.match("(?=.*[!@#$%^&*])");
      },
      `<p class="text-danger small">Password should contain at least 1 special character!</p>`
  );



  $("#user-input").on("submit", function (event) {
    // adding rules for inputs with class 'comment'
    $(".validate").each(function () {
      $(this).rules("add", {
        required: true,
        repNumber: true,
        incrNum:true,
        descNum:true,
        incrChar:true,
        descChar:true,
        AtLeastOneLAC:true,
        AtLeastOneUAC:true,
        AtLeastOneNC:true,
        AtLeastOneSC:true,
        minlength: 8,
        messages: {
          required: `<p class="text-danger small">opps! required</p>`,
          minlength: `<p class="text-danger small">opps! minimum length required 8 </p>`

        },
      });
    });

    // prevent default submit action
    event.preventDefault();

    // test if form is valid
    if ($("#user-input").validate().form()) {
      console.log("validates");
      alert("good password");
    } else {
      console.log("does not validate");
    }
  });
  $("#user-input").validate();
});