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
            res.Should().BeOfType<CreatedAtActionResult>();
        }
        private async Task<IActionResult> TestPut(Child child)
        {
            return new CreatedAtActionResult("GetChild", "Children", new { id = child.ChildId }, child);
        }

        #endregion
    }
}
