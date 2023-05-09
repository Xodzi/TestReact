using FakeItEasy;
using FluentAssertions;
using TestReact.Controllers;
using TestReact.Models;
using TestReact.Repository;
using Moq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol.Core.Types;
using System.Linq;
using System.Net;

namespace Tests.ControllerTests
{
    public class ChildControllerTest
    {
        private IChildrenRepository _childrenRepository;
        private ClinicContext _clinicContext;
        private ChildrenController _childrenController;

        public ChildControllerTest() {
            //Depen
            _childrenRepository = A.Fake<IChildrenRepository>();
            _clinicContext = A.Fake<ClinicContext>();

            //SUT
            _childrenController = new ChildrenController(_clinicContext,_childrenRepository);

        }

        #region Get
        [Fact]
        public async void ChildrenController_Get_ReturnsSuccess()
        {
            //Arrange
            var childrens = A.Fake<IEnumerable<Child>>();
            A.CallTo(() => _childrenRepository.GetChildren()).Returns(childrens);
            //Act
            var result = _childrenController.GetChildren();
            //Assert
            result.Should().BeOfType<Task<IEnumerable<Child>>>();
        }
        #endregion

        #region Put
        [Fact]
        public async void ChildrenController_Put_Null_ReturnBadReq()
        {
            var mock = new Mock<IChildrenRepository>();
            var cntrl = new ChildrenController(mock.Object);

            //Act
            var res = await cntrl.PutChild(1, null);

            res.Should().BeOfType<BadRequestResult>();
        }
        [Fact]
        public async void ChildrenController_Put_ReturnSuccess()
        {
            //Arrange
            var mock = new Mock<IChildrenRepository>();

            Child newChild = new Child { ChildId= 1 };

            mock.Setup(_childrenRepository => _childrenRepository.PutChild(1, newChild)).Returns(TestPut(newChild));

            var cntrl = new ChildrenController(mock.Object);

            //Act
            var res = await cntrl.PutChild(1, newChild);
            //Assert
            res.Should().BeOfType<CreatedAtActionResult>().Which.StatusCode.Should().Be((int)HttpStatusCode.Created);
        }
        private async Task<IActionResult> TestPut(Child child)
        {
            return new CreatedAtActionResult("GetChild", "Children", new { id = child.ChildId }, child);
        }

        #endregion

        #region Post
        [Fact]
        public async void ChildrenController_Post_BadReq()
        {
            var mock = new Mock<IChildrenRepository>();
            var cntrl = new ChildrenController(mock.Object);

            var res = await cntrl.PostChild(null);

            res.Should().BeOfType<ActionResult<Child>>().Which.Result.Should().BeOfType<BadRequestResult>().Which.StatusCode.Should().Be((int)HttpStatusCode.BadRequest);
        }
        [Fact]
        public async void ChildrenController_Post_ReturnSuccess()
        {
            var mock = new Mock<IChildrenRepository>();

            Child newChild = new Child { ChildId = 1 };

            mock.Setup(_childrenRepository => _childrenRepository.PostChild(newChild)).Returns(TestPost(newChild));

            var cntrl = new ChildrenController(mock.Object);

            var res = await cntrl.PostChild(newChild);

            res.Should().BeOfType<ActionResult<Child>>().Which.Result.Should().BeOfType<CreatedAtActionResult>().Which.StatusCode.Should().Be((int)HttpStatusCode.Created);
        }
        private async Task<ActionResult<Child>> TestPost(Child child)
        {
            return new CreatedAtActionResult("GetChild", "Children", new { id = child.ChildId }, child);
        }

        #endregion

        #region Delete

        [Fact]
        public async void ChildrenController_Delete_ReturnSuccess()
        {
            var mock = new Mock<IChildrenRepository>();

            int id = 1;

            mock.Setup(_childrenRepository => _childrenRepository.DeleteChild(id)).Returns(TestDelete(id));

            var cntrl = new ChildrenController(mock.Object);

            var res = await cntrl.DeleteChild(id);

            res.Should().BeOfType<NoContentResult>().Which.StatusCode.Should().Be((int)HttpStatusCode.NoContent);
        }
        private async Task<IActionResult> TestDelete(int id)
        {
            return new NoContentResult();
        }

        #endregion
    }
}
